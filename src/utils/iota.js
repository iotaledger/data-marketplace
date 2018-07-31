import IOTA from 'iota.lib.js';
import curl from 'curl.lib.js';
import { provider } from '../config.json';
import api, { fetchData } from './api';
import { generateSeed } from './helpers';

export const iota = new IOTA({ provider });

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

export const purchaseData = async (seed, address, value) => {
  try {
    curl.init();
    curl.overrideAttachToTangle(iota);
  } catch (error) {
    console.error('Curl override failed', error);
  }
  try {
    const transfers = [{ address: iota.utils.addChecksum(address), value: parseInt(value, 10) }];
    return new Promise(function(resolve, reject) {
      iota.api.sendTransfer(seed, 5, 9, transfers, (error, result) => {
        if (error !== null) {
          console.error('sendTransfer error', error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.error('purchaseData error. Device address is invalid', error);
    throw Error('Device address is invalid');
  }
};

export const getBalance = async address => {
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

export const generateDeviceAddress = callback => {
  iota.api.getNewAddress(generateSeed(81), {}, (error, address) => {
    if (error) {
      console.error('generateDeviceAddress error', error);
      throw error;
    }
    callback(address);
  });
};
