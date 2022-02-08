import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true });

import {
  getKey,
  getSk,
  getPurchase,
  getData,
  getDevice,
  getDevices,
  getUserDevices,
  getNumberOfDevices,
  getUser,
  getUserWallet,
  getSettings,
  setUser,
  setDevice,
  setPacket,
  setPurchase,
  setApiKey,
  setWallet,
  deleteDevice,
  toggleWhitelistDevice,
  updateBalance,
  getEmailSettings,
  getDustProtectionThreshold
} from './firebase';
const { sendEmail } = require('./email');
import {
  generateUUID,
  generateSeed,
  sanatiseObject,
  faucet,
  initWallet,
  checkRecaptcha,
  purchaseData,
  iacToAddress,
  addressToIac,
  gpsToIac,
  initSemarketWallet,
  getBalance,
  fundWallet
} from './helpers';
import { migration } from './migration';

exports.balance = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const params = req.query;
    if (!params && !params.address) {
      console.error('balance failed: ', params);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }
    try {
      const address = <string>params.address;
      const balanceWithDustProtection = await getBalance(address);
      const dustProtectionThreshold = await getDustProtectionThreshold();
      const balance =
        balanceWithDustProtection - dustProtectionThreshold >= 0
          ? balanceWithDustProtection - dustProtectionThreshold
          : 0;
      return res.status(200).json(balance);
    } catch (error) {
      console.error('Could not get balance', error);
      return res.status(500).json({ error: 'Could not get balance' });
    }
  });
});

// Take in data from device
exports.newData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    // Add device key into the list
    if (!packet || !packet.id || !packet.sk || !packet.packet) {
      console.error('newData failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      const device = await getSk(packet.id);
      if (device.sk === packet.sk) {
        return res.json({
          success: await setPacket(packet.id, packet.packet)
        });
      } else {
        console.error('newData failed. Key is incorrect', device.sk, packet.sk);
        throw Error('Oh noes, your key is incorrect.');
      }
    } catch (e) {
      console.error('newData failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Add new device
exports.newDevice = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    // Add device key into the list
    if (!packet || !packet.id || !packet.device || !packet.apiKey) {
      console.error('newDevice failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }
    // Modify object to include
    packet.device.sensorId = packet.id;
    packet.device.inactive = true;

    try {
      const invalid = sanatiseObject(packet.device);
      const secretKey = generateSeed();
      if (invalid) throw Error(invalid);

      const key = await getKey(<string>packet.apiKey);
      const userDevices = await getUserDevices(key.uid);
      const user = await getUser(key.uid);
      if (!user.numberOfDevices) {
        user.numberOfDevices = await getNumberOfDevices();
      }
      if (userDevices.length < user.numberOfDevices) {
        const device = await getDevice(<string>packet.id, true);
        if (device && device.owner !== key.uid) {
          return res.json({
            error: `Device with ID ${packet.id} already exists. Please specify new unique ID`
          });
        }
        const {
          wallet: { address, seed }
        } = await initWallet();

        return res.json({
          success: await setDevice(packet.id, secretKey, address, seed, packet.device),
          sk: secretKey
        });
      } else {
        console.error('newDevice failed. You have too many devices', userDevices.length);
        return res.json({
          error: 'You have too many devices. Please delete one to clear space'
        });
      }
    } catch (e) {
      console.error('newDevice failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Allow device deletion
exports.delete = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    // Add device key into the list
    if (!packet || !packet.deviceId || !packet.apiKey) {
      console.error('removeDevice failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      const { apiKey, deviceId } = packet;
      const key = await getKey(<string>apiKey);
      const device = await getDevice(<string>deviceId, true);

      if (!device) {
        throw Error(`Device doesn't exist`);
      }
      if (device.owner === key.uid) {
        return res.json({
          success: await deleteDevice(<string>deviceId)
        });
      } else {
        console.error("removeDevice failed. You don't have permission to delete this device", device.owner, key.uid);
        throw Error(`You don't have permission to delete this device`);
      }
    } catch (e) {
      console.error('removeDevice failed. Error: ', e.message);
      return res.status(403).json({
        error: e.message
      });
    }
  });
});

// Query Devices
exports.devices = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const params = req.query;
      if (params && params.userId && params.apiKey) {
        const { uid } = await getKey(<string>params.apiKey);
        if (params.userId === uid) {
          const userDevices = await getUserDevices(params.userId as string);
          const promises = await userDevices.map(async (device) => {
            // eslint-disable-next-line no-async-promise-executor
            const promise = await new Promise(async (resolve, reject) => {
              try {
                const keyObj = await getSk(device.sensorId);
                if (keyObj.sk) {
                  resolve(keyObj.sk);
                }
                reject({ error: 'Error' });
              } catch (error) {
                reject({ error });
              }
            });

            return { ...device, sk: promise };
          });

          const devices = await Promise.all(promises);
          return res.json(devices);
        }
        return res.status(403).json({ error: 'Access denied' });
      }
      return res.json(await getDevices());
    } catch (e) {
      console.error('devices failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Query Device
exports.device = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const params = req.query;
    // Add device key into the list
    if (!params || !params.deviceId) {
      console.error('device failed. Packet: ', params);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      const device = await getDevice(params.deviceId as string);
      if (!device) {
        throw Error(`Device doesn't exist`);
      }
      if (device && !device.price) {
        const settings = await getSettings();
        device.price = settings.defaultPrice;
      }
      return res.json(device);
    } catch (e) {
      console.error('device failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Query Stream
exports.stream = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const params = req.query;
    if (!params || !params.deviceId || !params.userId) {
      console.error('stream failed. Params: ', params);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      // Make sure purchase exists
      const purchase = await getPurchase(<string>params.userId, <string>params.deviceId);
      if (!purchase) {
        return res.json({ success: false });
      }
      // Return data
      return res.json(await getData(<string>params.deviceId, params.time as any));
    } catch (e) {
      console.error('stream failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// // Setup User with an API Key
exports.setupUser = functions.auth.user().onCreate((user) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject): Promise<void> => {
    if (!user.email) {
      reject();
    } else {
      // Try saving
      try {
        const apiKey = generateUUID();
        const numberOfDevices = (await getNumberOfDevices()) || 5;
        await setUser(user.uid, { apiKey, numberOfDevices });
        await setApiKey(apiKey, user.uid, user.email);
        resolve(null);
      } catch (e) {
        console.error('setupUser rejected with ', e.message);
        reject(e.message);
      }
    }
  });
});

// Toggle whitelist entry
exports.toggleWhitelist = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const packet = req.body;
    if (!packet || !packet.sensorId || !packet.isInactive || !packet.apiKey || !packet.uid) {
      console.error('toggleWhitelist failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      const data = await getKey(<string>packet.apiKey);
      if (data.email && data.email.indexOf('iota.org') !== -1 && packet.uid === data.uid) {
        // Toggle whitelist
        console.error('toggleWhitelist success', packet, data);
        await toggleWhitelistDevice(packet.sensorId, packet.isInactive);
        return res.json({ success: true });
      }
      return res.status(403).json({ error: 'Access denied' });
    } catch (e) {
      console.error('toggleWhitelist failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.user = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const params = req.query;
    if (!params || !params.userId) {
      console.error('Get user failed. Params: ', params);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      // Retrieve user
      const user = await getUser(params.userId as string);
      if (!user) {
        return res.json(null);
      }
      if (!user.numberOfDevices) {
        user.numberOfDevices = await getNumberOfDevices();
      }
      return res.json({ ...user });
    } catch (e) {
      console.error('user failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const packet = req.body;

    if (
      !packet ||
      !packet.name ||
      !packet.company ||
      !packet.email ||
      !packet.country ||
      !packet.acceptedDisclaimer ||
      !packet.captcha
    ) {
      console.error('sendEmail failed. Packet: ', packet);
      return res.status(400).json({ error: 'Malformed Request' });
    }

    try {
      // Send email
      await sendEmail(packet);
      return res.json({ success: true });
    } catch (e) {
      console.error('sendEmail failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.settings = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Retrieve settings
      return res.json(await getSettings());
    } catch (e) {
      console.error('settings failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.wallet = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const packet = req.body;
    if (!packet || !packet.userId) {
      console.error('wallet failed. Packet: ', packet);
      return res.status(400).json({ error: 'Malformed Request' });
    }
    const userId = packet.userId;
    try {
      const wallet = await getUserWallet(userId);
      // If wallet already exits, refill wallet
      if (wallet) {
        const filledWallet = await fundWallet(wallet.address, wallet.seed);
        await setWallet(packet.userId, filledWallet.wallet);
        return res.status(200).json({ messageId: filledWallet.messageId });
      } else {
        const initializedWallet = await initWallet();
        await setWallet(packet.userId, initializedWallet.wallet);
        return res.status(201).json({ messageId: initializedWallet.messageId });
      }
    } catch (e) {
      console.error('wallet failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.faucet = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const packet = req.body;
    if (!packet || !packet.address || !packet.captcha) {
      console.error('faucet failed. Packet: ', packet);
      return res.status(400).json({ error: 'Malformed Request' });
    }

    try {
      const emailSettings = await getEmailSettings();
      // Check Recaptcha
      const recaptcha = await checkRecaptcha(packet.captcha, emailSettings);
      if (!recaptcha || !recaptcha.success) {
        console.error('faucet failed. Recaptcha is incorrect. ', recaptcha['error-codes']);
        return res.status(403).json({ error: recaptcha['error-codes'] });
      }

      const { messageId } = await faucet(packet.address);
      return res.json({ messageId });
    } catch (e) {
      console.error('faucet failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.purchaseStream = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const packet = req.body;
    if (!packet || !packet.userId || !packet.deviceId) {
      console.error('purchaseStream failed. Packet: ', packet);
      return res.status(400).json({ error: 'Malformed Request' });
    }

    try {
      const device = await getDevice(packet.deviceId);
      const wallet = await getUserWallet(packet.userId);
      const { defaultPrice } = await getSettings();
      let price = defaultPrice;
      if (device) {
        if (device.price) {
          price = Number(device.price);
        } else if (device.value) {
          price = Number(device.value);
        }
      } else {
        return res.json({ error: `Device doesn't exist` });
      }
      const dustProtectionThreshold = await getDustProtectionThreshold();
      const newWalletBalance = Number(wallet.balance) - Number(price);
      if (newWalletBalance < dustProtectionThreshold) {
        console.error('purchaseStream failed. Not enough funds', packet);
        return res.json({
          error: 'Not enough funds in your wallet.'
        });
      }
      try {
        await purchaseData(packet.userId, packet.deviceId, device.address, price);
      } catch (e) {
        return res.status(403).json({ error: e.message });
      }

      await setPurchase(packet.userId, packet.deviceId);
      await updateBalance(packet.userId, newWalletBalance);
      return res.json({ success: true });
    } catch (e) {
      console.error('purchaseData failed. Error: ', e, packet);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.semarket = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const params = req.query;
      if (params.address) {
        const messageId = await initSemarketWallet(<string>params.address, parseInt(<string>params.amount) || null);
        return res.json({ messageId: messageId });
      }
      return res.json({ success: false, error: 'no address' });
    } catch (e) {
      console.error('semarket wallet failed. Error: ', e);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.location = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const params = req.query;
      let result = null;
      if (params.address) {
        result = await addressToIac(decodeURI(params.address.toString()));
      } else if (params.iac) {
        result = await iacToAddress(params.iac);
      } else if (params.gps) {
        const coordinates = params.gps
          .toString()
          .split(',')
          .map((coord) => Number(coord));
        result = await gpsToIac(...(coordinates as [number, number]));
      }
      return res.json(result);
    } catch (e) {
      console.error('location failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.migration = functions.runWith({timeoutSeconds: 540}).https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const params = req.query;
      console.log(params)
      if (!params.from || !params.to) {
        return res.status(400).json({ error: "params missing"});
      }
      
      // await migration(parseInt(params.from as string), parseInt(params.to as string) );
      console.log("Finished")
      return res.status(200).json({ success: true});
    } catch (e) {
      console.error('migration failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});
