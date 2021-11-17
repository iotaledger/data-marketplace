import api from './api';

export const purchaseStream = (userId, deviceId) => {
  return new Promise(async (resolve, reject) => {
    // Try purchase
    try {
      const purchaseStreamResponse = await api.post('purchaseStream', { userId, deviceId });
      if (purchaseStreamResponse && purchaseStreamResponse.success) {
        resolve();
      }
      console.error('Purchase error', purchaseStreamResponse.error);
      reject(purchaseStreamResponse && purchaseStreamResponse.error);
    } catch (error) {
      console.error('getBundleHashes error', error);
      reject(error);
    }
  });
};

export const getData = async (userId, deviceId, time) => {
  try {
    const result = await getPackets(userId, deviceId, time);
    if (result.error) {
      console.error('getData error', result.error);
    }
    return result;
  } catch (error) {
    console.error('getData error', error);
    return null;
  }
};

const getPackets = (userId, deviceId, time) => {
  return new Promise(async (resolve, reject) => {
    const packets = await api.get('stream', { userId, deviceId, time });
    if (packets) {
      resolve(packets);
    } else {
      reject('No packets purchased');
    }
  });
};

/**
 * Get the balance adjusted for dust protection
 * @param {*} address
 * @returns real balance - dust protection threshold (currently 1Mi)
 */
export const getBalance = async (address) => {
  try {
    const balance = await api.get('balance', { address });
    return balance;
  } catch (error) {
    console.error('getBalance error', error);
    return 0;
  }
};
