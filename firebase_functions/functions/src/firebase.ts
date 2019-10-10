import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.getKey = async (key: string) => {
  // Get API key
  const doc = await admin
    .firestore()
    .collection('keys')
    .doc(key)
    .get();
  if (doc.exists) return doc.data();
  console.error('getKey failed. API key is incorrect. ', key, doc);
  throw Error('Your API key is incorrect.');
};

exports.getSk = async (deviceId: string) => {
  // Get API key
  const doc = await admin
    .firestore()
    .collection('deviceList')
    .doc(deviceId)
    .get();
  if (doc.exists) return doc.data();
  console.error('getSk failed. device does not exist', deviceId, doc);
  throw Error(`The device doesn't exist.`);
};

exports.getPurchase = async (uid: string, device: string) => {
  // Get User's purchase
  const doc = await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('purchases')
    .doc(device)
    .get();
  // Check user's profile for purchase
  if (doc.exists) return doc.data();
  console.log('Device not purchased', uid, device);
  return false;
};

exports.getData = async (device: string, timestamp?: number) => {
  const time = timestamp ? Number(timestamp) : Date.now();
  // Get data
  const querySnapshot = await admin
    .firestore()
    .collection('devices')
    .doc(device)
    .collection('data')
    .where('time', '<', time)
    .orderBy('time', 'desc')
    .limit(20)
    .get();

  if (querySnapshot.size === 0) return [];

  // Return data
  return querySnapshot.docs.map(doc => {
    if (doc.exists) {
      return doc.data();
    } else {
      console.log('getData failed.', device, doc);
      return null;
    }
  });
};

exports.getDevice = async (device: string, internal: boolean = false) => {
  // Get User's purchase
  const doc = await admin
    .firestore()
    .collection('devices')
    .doc(device)
    .get();
  // Check user's profile for purchase
  if (doc.exists) {
    const result = doc.data();
    if (!internal) {
      delete result.sk;
      delete result.owner;
    }
    return result;
  }
  console.log('getDevice failed.', device, doc);
  return null;
};

exports.getDevices = async () => {
  // Get data
  const querySnapshot = await admin
    .firestore()
    .collection('devices')
    .get();

  const promises = [];
  const results = [];

  querySnapshot.docs.forEach(doc => {
    const promise = new Promise((resolve, reject) => {
      try {
        if (doc.exists) {
          const result = doc.data();
          result.createTime = doc.createTime;
          delete result.sk;
          delete result.owner;

          // Get data
          admin
            .firestore()
            .collection('devices')
            .doc(result.sensorId)
            .collection('data')
            .limit(2)
            .get()
            .then(deviceData => {
              if (deviceData.size !== 0) {
                result.hasData = true;
                results.push(result);
              };
              resolve(result);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          console.log('getDevices failed.', doc);
          return null;
        }
      } catch (error) {
        reject(error);
      }
    });
    promises.push(promise);
  });

  // Return data
  return await Promise.all(promises)
    .then(() => results)
    .catch(error => {
      console.log('getDevices error', error);
    });
};

exports.getUserDevices = async (user: string) => {
  // Get data
  const querySnapshot = await admin
    .firestore()
    .collection('devices')
    .where('owner', '==', user)
    .get();
  // Check there is data
  if (querySnapshot.size === 0) return [];
  // Return data
  return querySnapshot.docs.map(doc => {
    if (doc.exists) {
      const result = doc.data();
      delete result.sk;
      delete result.owner;
      return result;
    } else {
      console.log('getUserDevices failed.', user, doc);
      return null;
    }
  });
};

exports.setPacket = async (device: string, packet: any) => {
  // Save users API key and Seed
  await admin
    .firestore()
    .collection('devices')
    .doc(device)
    .collection('data')
    .doc()
    .set(packet);

  return true;
};

exports.setUser = async (uid: string, obj: any) => {
  // Save users API key and Seed
  await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set(obj);

  return true;
};

exports.setDevice = async (deviceId: string, sk: string, address: string, seed: string, device: any) => {
  // Save users API key and Seed
  await admin
    .firestore()
    .collection('deviceList')
    .doc(deviceId)
    .set({ sk, seed });

  // Add public device record
  await admin
    .firestore()
    .collection('devices')
    .doc(deviceId)
    .set({ ...device, address });

  // Add device to owners' purchases
  await admin
    .firestore()
    .collection('users')
    .doc(device.owner)
    .collection('purchases')
    .doc(deviceId)
    .set({
      full: true,
      time: Date.now(),
    });

  return true;
};

exports.setApiKey = async (apiKey: string, uid: string, email: string) => {
  // Set API key in separate table
  await admin
    .firestore()
    .collection('keys')
    .doc(apiKey)
    .set({
      email,
      uid,
    });
  return true;
};

exports.setOwner = async (deviceId: string, owner: string) => {
  // Save new owner
  await admin
    .firestore()
    .collection('devices')
    .doc(deviceId)
    .set({ owner }, { merge: true });
  return true;
};

exports.setPurchase = async (userId: string, deviceId: string) => {
  // Save new owner
  await admin
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('purchases')
    .doc(deviceId)
    .set({
      full: true,
      time: Date.now(),
    });
  return true;
};

exports.deleteDevice = async (device: any) => {
  // Remove Device
  await admin
    .firestore()
    .collection('deviceList')
    .doc(device)
    .delete();

  // Get device data
  const querySnapshot = await admin
    .firestore()
    .collection('devices')
    .doc(device)
    .collection('data')
    .get();

  querySnapshot.docs.forEach(async doc => {
    // Delete device data
    await admin
      .firestore()
      .collection('devices')
      .doc(device)
      .collection('data')
      .doc(doc.id)
      .delete();
  });

  await admin
    .firestore()
    .collection('devices')
    .doc(device)
    .delete();
  return true;
};

exports.toggleWhitelistDevice = async (sensorId: string, inactive: string) => {
  // Whitelist device
  await admin
    .firestore()
    .collection('devices')
    .doc(sensorId)
    .set({ inactive: inactive === 'true' }, { merge: true });
  return true;
};

exports.getUser = async (userId: string) => {
  // Get user
  const doc = await admin
    .firestore()
    .collection('users')
    .doc(userId)
    .get();

  // Check and return user
  if (doc.exists) {
    const result = doc.data();
    delete result.seed;

    if (result.wallet) {
      delete result.wallet.seed;
      delete result.wallet.address;
      delete result.wallet.keyIndex;
    }
    return result;
  }

  console.log('User not in DB:', userId);
  return null;
};

exports.getNumberOfDevices = async () => {
  const doc = await admin
    .firestore()
    .collection('settings')
    .doc('settings')
    .get();
  if (doc.exists) {
    const data = doc.data();
    if (data.numberOfDevices) {
      return data.numberOfDevices;
    }
  }
  console.log('getNumberOfDevices failed. Setting does not exist', doc);
  throw Error(`The getNumberOfDevices setting doesn't exist.`);
};

exports.getSettings = async () => {
  // Get data
  const doc = await admin
    .firestore()
    .collection('settings')
    .doc('settings')
    .get();
  if (doc.exists) {
    const {
      defaultPrice,
      documentation,
      iotaApiVersion,
      mapboxApiAccessToken,
      mapboxStyles,
      provider,
      recaptchaSiteKey,
      tangleExplorer,
    } = doc.data();
    return {
      defaultPrice,
      documentation,
      iotaApiVersion,
      mapboxApiAccessToken,
      mapboxStyles,
      provider,
      recaptchaSiteKey,
      tangleExplorer,
    };
  }
  console.error('getSettings failed. Setting does not exist', doc);
  throw Error(`The getSettings setting doesn't exist.`);
};

exports.getUserWallet = async (uid: string) => {
  // Get User's wallet
  const doc = await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .get();

  if (doc.exists) {
    const data = doc.data();
    return data.wallet || null;
  }
  console.log('getUserWallet failed. ', uid);
  throw Error(`The wallet doesn't exist.`);
};

exports.setWallet = async (uid: string, wallet: any) => {
  // Create wallet
  await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ wallet: { ...wallet } }, { merge: true });
  return true;
};

exports.updateBalance = async (uid: string, balance: any) => {
  await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ wallet: { balance } }, { merge: true });
  return true;
};

exports.updateUserWalletAddressKeyIndex = async (address: string, keyIndex: number, uid: string) => {
  await admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ wallet: { address, keyIndex } }, { merge: true });
  return true;
};

exports.getIotaWallet = async () => {
  const doc = await admin
    .firestore()
    .collection('settings')
    .doc('settings')
    .get();
  if (doc.exists) {
    const data = doc.data();
    if (data.wallet) {
      return data.wallet;
    }
    console.error('getIotaWallet failed. Setting does not exist', data.wallet);
  }
  throw Error(`The getIotaWallet setting doesn't exist.`);
};

exports.updateWalletAddressKeyIndex = async (address: string, keyIndex: number, userId: string) => {
  console.log('updateWalletAddressKeyIndex', address, keyIndex, userId);
  await admin
    .firestore()
    .collection('settings')
    .doc('settings')
    .set({ wallet: { address, keyIndex } }, { merge: true });
  return true;
};

exports.getEmailSettings = async () => {
  const doc = await admin
    .firestore()
    .collection('settings')
    .doc('settings')
    .get();
  if (doc.exists) {
    const data = doc.data();
    return data.email || null;
  }
  console.error('getEmailSettings failed. Setting does not exist', doc);
  throw Error(`The getEmailSettings setting doesn't exist.`);
};

exports.getGoogleMapsApiKey = async () => {
  const doc = await admin
    .firestore()
    .collection('settings')
    .doc('settings')
    .get();
  if (doc.exists) {
    const data = doc.data();
    if (data.googleMapsApiKey) {
      return data.googleMapsApiKey;
    }
  }
  console.log('getGoogleMapsApiKey failed. Setting does not exist', doc);
  throw Error(`The getGoogleMapsApiKey setting doesn't exist.`);
};
