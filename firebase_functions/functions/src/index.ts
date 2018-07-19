import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true });
const iota = require('iota.lib.js');

const IOTA = new iota({
  provider: 'https://testnet140.tangle.works:443',
});

const {
  getKey,
  getSk,
  getPurchase,
  getData,
  getDevice,
  getDevices,
  getUserDevices,
  getUser,
  setUser,
  setDevice,
  setPacket,
  setPurchase,
  setOwner,
  setApiKey,
  deleteDevice,
  toggleWhitelistDevice,
} = require('./firebase');
const { sendEmail } = require('./email');
const { generateUUID, seedGen, sanatiseObject, findTx } = require('./helpers');

// Take in data from device
exports.newData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    // Add device key into the list
    if (!packet || !packet.id || !packet.sk || !packet.packet) {
      console.log('newData failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      const device = await getSk(packet.id);
      if (device.sk === packet.sk) {
        return res.json({
          success: await setPacket(packet.id, packet.packet),
        });
      } else {
        console.log('newData failed. Key is incorrect', device.sk, packet.sk);
        throw Error('Oh noes, your key is incorrect.');
      }
    } catch (e) {
      console.log('newData failed. Error: ', e.message);
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
      console.log('newDevice failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }
    // Modify object to include
    packet.device.sensorId = packet.id;
    packet.device.inactive = true;

    try {
      const invalid = sanatiseObject(packet.device);
      const secretKey = seedGen(15);
      if (invalid) throw Error(invalid);

      const key = await getKey(<String>packet.apiKey);
      const userDevices = await getUserDevices(key.uid);
      if (userDevices.length <= 4) {
        return res.json({
          success: await setDevice(packet.id, secretKey, packet.device),
        });
      } else {
        console.log('newDevice failed. You have too many devices', userDevices.length);
        throw Error('You have too many devices. Please delete one to clear space');
      }
    } catch (e) {
      console.log('newDevice failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Allow device deletion
exports.removeDevice = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    // Add device key into the list
    if (!packet || !packet.id || !packet.apiKey) {
      console.log('removeDevice failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      const { apiKey, id } = packet;
      const key = await getKey(<String>apiKey);
      const device = await getDevice(<String>id);
      if (device.owner === key.uid) {
        return res.json({
          success: await deleteDevice(<String>id),
        });
      } else {
        console.log(
          "removeDevice failed. You don't have permission to delete this device",
          device.owner,
          key.uid
        );
        throw Error(`You don't have permission to delete this device`);
      }
    } catch (e) {
      console.log('removeDevice failed. Error: ', e.message);
      return res.status(403).json({
        error: e.message,
      });
    }
  });
});

// Take ownership of a device
exports.grandfather = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const packet = req.body;
    if (!packet || !packet.id || !packet.owner || !packet.sk) {
      console.log('grandfather failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      // Get Device's SK
      const device = await getSk(packet.id);
      // If SK is true
      if (device.sk === packet.sk) {
        // Set owner
        await setOwner(packet.id, packet.owner);
        return res.json({ success: true });
      } else {
        console.log('grandfather failed. Key is incorrect', device.sk, packet.sk);
        throw Error('Oh noes, your key is incorrect.');
      }
    } catch (e) {
      console.log('grandfather failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Query Devices
exports.getDevices = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      return res.json(await getDevices());
    } catch (e) {
      console.log('getDevices failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Query Device
exports.getDevice = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    // Add device key into the list
    if (!packet || !packet.deviceId) {
      console.log('getDevice failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      return res.json(await getDevice(packet.deviceId));
    } catch (e) {
      console.log('getDevice failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Query Stream
exports.queryStream = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    if (!packet || !packet.deviceId || !packet.userId) {
      console.log('queryStream failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      // Make sure purchase exists
      const purchase = await getPurchase(<String>packet.userId, <String>packet.deviceId);
      if (purchase) {
        // Return data
        return res.json({ data: await getData(<String>packet.deviceId), purchase });
      }
      return res.status(403).json({ error: 'No packets purchased' });
    } catch (e) {
      console.log('queryStream failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// GIve access once a stream is purchased
// Add bundle validation.
exports.purchaseStream = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    // Add device key into the list
    if (!packet || !packet.id || !packet.device || !packet.hashes) {
      console.log('purchaseStream failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      // Find TX on network and parse
      const data = await findTx(packet, IOTA);
      // Make sure TX is valid
      if (!IOTA.utils.validateSignatures(data, data.find(tx => tx.value < -1).address)) {
        console.log('purchaseStream failed. Transaction is invalid for: ', data);
        throw Error('Transaction is Invalid');
      }

      return res.json({
        success: await setPurchase(packet.id, packet.device),
      });
    } catch (e) {
      console.log('purchaseStream failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// // Setup User with an API Key
exports.setupUser = functions.auth.user().onCreate(event => {
  return new Promise(async (resolve, reject) => {
    const user = event.data; // The Firebase user.

    if (!user.email) {
      reject();
    } else {
      // Try saving
      try {
        const apiKey = generateUUID();
        const seed = seedGen();

        await setUser(user.uid, {
          apiKey,
          seed,
        });

        await setApiKey(apiKey, user.uid);

        console.log('setupUser resolved for UID', user.uid);
        resolve();
      } catch (e) {
        console.log('setupUser rejected with ', e.message);
        reject(e.message);
      }
    }
  });
});

// Get devices by user
exports.getDevicesByUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const packet = req.body;
    if (!packet || !packet.uid) {
      console.log('getDevicesByUser failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      const userDevices = await getUserDevices(packet.uid);
      const promises = await userDevices.map(async device => {
        const promise = await new Promise(async (resolve, reject) => {
          try {
            const keyObj = await getSk(device.sensorId);
            if (keyObj.sk) {
              return resolve(keyObj.sk);
            }
            return reject({ error: 'Error' });
          } catch (error) {
            return reject({ error });
          }
        });

        return { ...device, sk: promise };
      });

      const devices = await Promise.all(promises);
      return res.json(devices);
    } catch (e) {
      console.log('getDevicesByUser failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// Toggle whitelist entry
exports.toggleWhitelist = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const packet = req.body;
    if (!packet || !packet.sensorId || !packet.isInactive) {
      console.log('toggleWhitelist failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      // Toggle whitelist
      await toggleWhitelistDevice(packet.sensorId, packet.isInactive);
      return res.json({ success: true });
    } catch (e) {
      console.log('toggleWhitelist failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

exports.getUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check Fields
    const packet = req.body;
    if (!packet || !packet.userId) {
      console.log('getUser failed. Packet: ', packet);
      return res.status(400).json({ error: 'Ensure all fields are included' });
    }

    try {
      // Retrieve user
      return res.json({ user: await getUser(packet.userId) });
    } catch (e) {
      console.log('getUser failed. Error: ', e.message);
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
      !packet.body ||
      !packet.captcha
    ) {
      console.log('sendEmail failed. Packet: ', packet);
      return res.status(400).json({ error: 'Malformed Request' });
    }

    try {
      // Send email
      await sendEmail(packet);
      return res.json({ success: true });
    } catch (e) {
      console.log('sendEmail failed. Error: ', e.message);
      return res.status(403).json({ error: e.message });
    }
  });
});

// // Query Devices
// exports.listDevicesWithBadAddress = functions.https.onRequest((req, res) => {
//     cors(req, res, async () => {
//         try {
//             const reg = /^.+?\D$/gm // all strings that ends in NOT 9
//             const devices = await getDevices()
//             devices.map(({ sensorId, address, owner }) => {
//                 if (reg.test(address)) {
//                     console.log(address, sensorId, owner)
//                 }
//             })
//             return res.json({ data: 'ok' })
//         } catch (e) {
//             console.log('getDevices failed. Error: ', e.message)
//             return res.status(403).json({ error: e.message })
//         }
//     })
// })
