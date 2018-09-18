import { composeAPI, createPrepareTransfers } from '@iota/core';
import api, { fetchData } from './api';

export const PoWAndSendTrytes = async (trytes, provider) => {
  try {
    return new Promise((resolve, reject) => {
      // Depth or how far to go for tip selection entry point
      const depth = 5

      // Difficulty of Proof-of-Work required to attach transaction to tangle.
      // Minimum value on mainnet & spamnet is `14`, `9` on devnet and other testnets.
      const minWeightMagnitude = 9

      const { sendTrytes } = composeAPI({ provider });

      sendTrytes(trytes, depth, minWeightMagnitude)
        .then(transactions => resolve(transactions))
        .catch(error => {
          console.log('PoWAndSendTrytes error sendTrytes', error);
          reject(error);
        })
    });
  } catch (error) {
    console.log('PoWAndSendTrytes error', error);
  }
};

export const getData = async (userId, deviceId) => {
  try {
    const result = await getPackets(userId, deviceId);
    if (result.purchase && !result.purchase.full) {
      const packets = await getPacketsPartial(result.purchase);
      return packets;
    } else if (result.error) {
      return result.error;
    } else {
      return result.data;
    }
  } catch (error) {
    console.error('getData error', error);
    return null;
  }
};

const getPackets = (userId, deviceId) => {
  return new Promise(async (resolve, reject) => {
    const packets = await api('queryStream', { userId, deviceId });
    if (packets) {
      resolve(packets);
    } else {
      reject('No packets purchased');
    }
  });
};

const getPacketsPartial = data => {
  return new Promise((resolve, reject) => {
    const packets = [];
    data.packets.map(ref =>
      ref.get().then(item => {
        if (item.exists) {
          packets.push(item.data());
          if (packets.length === data.packets.length) {
            resolve(packets);
          }
        } else {
          packets.push([]);
          if (packets.length === data.packets.length) {
            resolve(packets);
          }
        }
      })
    );
  });
};

export const purchaseData = async (seed, address, value, provider) => {
  try {
    const { sendTrytes } = composeAPI({ provider });
    const prepareTransfers = createPrepareTransfers();

    const promise = new Promise((resolve, reject) => {
      // Depth or how far to go for tip selection entry point
      const depth = 5;

      // Difficulty of Proof-of-Work required to attach transaction to tangle.
      // Minimum value on mainnet & spamnet is `14`, `9` on devnet and other testnets.
      const minWeightMagnitude = 9;

      const transfers = [{ address, value: parseInt(value, 10) }];

      prepareTransfers(seed, transfers)
        .then(trytes => sendTrytes(trytes, depth, minWeightMagnitude))
        .then(transactions => {
          resolve(transactions);
        })
        .catch(error => {
          console.error('sendTransfer error', error);
          reject(error);
        })
    });
    return promise;
  } catch (error) {
    console.error('purchaseData error. Device address is invalid', error);
    throw Error('Device address is invalid');
  }
};

export const getBalance = async (address, provider) => {
  try {
    const packet = {
      command: 'getBalances',
      addresses: [address.substring(0, 81).toUpperCase()],
      threshold: 100,
    };

    const result = await fetchData(provider, packet);
    if (result && result.balances && result.balances.length > 0) {
      return result.balances[0];
    }
    return 0;
  } catch (error) {
    console.error('getBalance error', error);
    return 0;
  }
};
