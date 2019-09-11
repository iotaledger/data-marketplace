import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true });
const { validateBundleSignatures } = require('@iota/bundle-validator');

const {
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
  setOwner,
  setApiKey,
  setWallet,
  deleteDevice,
  toggleWhitelistDevice,
  updateBalance,
  updateUserWalletAddressKeyIndex,
  getEmailSettings,
} = require('./firebase');
const { sendEmail } = require('./email');
const {
  generateUUID,
  generateSeed,
  generateNewAddress,
  sanatiseObject,
  findTx,
  faucet,
  initWallet,
  checkRecaptcha,
  purchaseData,
  iacToAddress,
  addressToIac,
  gpsToIac,
  initSemarketWallet,
} = require('./helpers');

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
          success: await setPacket(packet.id, packet.packet),
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
      const secretKey = generateSeed(15);
      const seed = generateSeed();
      const address = generateNewAddress(seed);
      if (invalid) throw Error(invalid);

      const key = await getKey(<String>packet.apiKey);
      const userDevices = await getUserDevices(key.uid);
      const user = await getUser(key.uid);
      if (!user.numberOfDevices) {
        user.numberOfDevices = await getNumberOfDevices();
      }
      if (userDevices.length < user.numberOfDevices) {
        const device = await getDevice(<String>packet.id, true);
        if (device && device.owner !== key.uid) {
          return res.json({ error: `Device with ID ${packet.id} already exists. Please specify new unique ID` });
        }

        return res.json({
          success: await setDevice(packet.id, secretKey, address, seed, packet.device),
          sk: secretKey
        });
      } else {
        console.error('newDevice failed. You have too many devices', userDevices.length);
        return res.json({ error: 'You have too many devices. Please delete one to clear space' });
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
      const key = await getKey(<String>apiKey);
      const device = await getDevice(<String>deviceId, true);

      if (!device) {
        throw Error(`Device doesn't exist`);
      }
      if (device.owner === key.uid) {
        return res.json({
          success: await deleteDevice(<String>deviceId),
        });
      } else {
        console.error(
          "removeDevice failed. You don't have permission to delete this device",
          device.owner,
          key.uid
        );
        throw Error(`You don't have permission to delete this device`);
      }
    } catch (e) {
      console.error('removeDevice failed. Error: ', e.message);
      return res.status(403).json({
        error: e.message,
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
        const { uid } = await getKey(<String>params.apiKey);
        if (params.userId === uid) {
          const userDevices = await getUserDevices(params.userId);
          const promises = await userDevices.map(async device => {
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
      const device = await getDevice(params.deviceId);
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
      const purchase = await getPurchase(<String>params.userId, <String>params.deviceId);
      if (!purchase) {
        return res.json({ success: false });
      }
      // Return data
      return res.json(await getData(<String>params.deviceId, params.time));
    } catch (e) {
      console.error('stream failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// // Setup User with an API Key
exports.setupUser = functions.auth.user().onCreate(user => {
  return new Promise(async (resolve, reject) => {
    if (!user.email) {
      reject();
    } else {
      // Try saving
      try {
        const apiKey = generateUUID();
        const numberOfDevices = (await getNumberOfDevices()) || 5;

        await setUser(user.uid, { apiKey, numberOfDevices });
        await setApiKey(apiKey, user.uid, user.email);

        console.log('setupUser resolved for UID', user.uid);
        resolve();
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
      const data = await getKey(<String>packet.apiKey);
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
      const user = await getUser(params.userId);
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

    try {
      const result = await initWallet(packet.userId);
      await setWallet(packet.userId, result.wallet);
      return res.json({ success: result.transactions.length > 0 });
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

      const transactions = await faucet(packet.address);
      return res.json({ transactions });
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
      const { iotaApiVersion, provider, defaultPrice } = await getSettings();
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

      let newWalletBalance;
      if (wallet && wallet.balance) {
        newWalletBalance = Number(wallet.balance) - Number(price);
        if (newWalletBalance < 0) {
          console.error('purchaseStream failed. Not enough funds', packet);
          return res.json({ error: 'Not enough funds or your new wallet is awaiting confirmation. Please try again in 5 min.' });
        }
      } else {
        console.error('purchaseStream failed. Wallet not set', packet);
        return res.json({ error: 'Wallet not set' });
      }

      const transactions = await purchaseData(packet.userId, device.address, price);
      console.log('purchaseStream', packet.userId, packet.deviceId, transactions);

      if (transactions) {
        const hashes = transactions && transactions.map(transaction => transaction.hash);

        // Find TX on network and parse
        const bundle = await findTx(hashes, provider, iotaApiVersion);

        // Make sure TX is valid
        if (!validateBundleSignatures(bundle)) {
          console.error('purchaseStream failed. Transaction is invalid for: ', bundle);
          res.status(403).json({ error: 'Transaction is Invalid' });
        }

        await setPurchase(packet.userId, packet.deviceId);
        await updateBalance(packet.userId, newWalletBalance);
        return res.json({ success: true });
      }
      return res.json({ error: 'Purchase failed. Insufficient balance of out of sync' });
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
        const transactions = await initSemarketWallet(params.address, params.amount || null);
        console.log('semarket wallet transactions:', transactions.length);
        return res.json({ success: transactions.length > 0 });
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
        result = await addressToIac(decodeURI(params.address));
        console.log(`Converted address "${decodeURI(params.address)}" to "${result}"`);
      } else if (params.iac) {
        result = await iacToAddress(params.iac);
        console.log(`Converted area code "${params.iac}" to "${result}"`);
      } else if (params.gps) {
        const coordinates = params.gps.split(',').map(coord => Number(coord));
        result = await gpsToIac(...coordinates);
        console.log(`Converted GPS coordinates "${params.gps}" to "${result}"`);
      }
      return res.json(result);
    } catch (e) {
      console.error('location failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});
