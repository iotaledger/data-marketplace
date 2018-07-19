import config from '../config.json';

export const userAuth = async firebase => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // User is signed in.
        resolve(user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            // Handle Errors here.
            const errorMessage = error.message;
            return errorMessage;
          });
      }
    });
  });
};

export const getData = async (userId, deviceId) => {
  try {
    const result = await getPackets(userId, deviceId);
    if (result.purchase && !result.purchase.full) {
      const packets = await getPacketsPartial(result.purchase);
      return packets;
    } else {
      return result.data;
    }
  } catch (e) {
    return e;
  }
};
export const allDevices = () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`https://${config.api}.marketplace.tangle.works/getDevices`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const devices = await response.json();
    resolve(devices);
  });
};

export const getDevice = deviceId => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`https://${config.api}.marketplace.tangle.works/getDevice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId }),
    });
    const device = await response.json();
    if (device) {
      resolve(device);
    } else {
      reject('No Device!');
    }
  });
};

const getPackets = (userId, deviceId) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`https://${config.api}.marketplace.tangle.works/queryStream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, deviceId }),
    });
    const packets = await response.json();
    if (packets) {
      resolve(packets);
    } else {
      reject('No packets purchased');
    }
  });
};

export const getPacketsPartial = data => {
  return new Promise((resolve, reject) => {
    const packets = [];
    data.packets.map(ref =>
      ref.get().then(item => {
        if (item.exists) {
          packets.push(item.data());
          if (packets.length === data.packets.length) resolve(packets);
        } else {
          packets.push([]);
          if (packets.length === data.packets.length) resolve(packets);
        }
      })
    );
  });
};
