import IOTA from 'iota.lib.js';
import curl from 'curl.lib.js';
import { provider, walletSeed } from '../config.json';
import api from '../utils/api';

export const iota = new IOTA({ provider });

export const initWallet = async () => {
  const response = await fetch(walletSeed);
  return await response.json();
};

export const purchaseData = async (seed, address, value) => {
  try {
    curl.init();
    curl.overrideAttachToTangle(iota);
    console.log('Overiding Curl');
  } catch (e) {
    console.log('Falling Back');
  }
  try {
    const transfers = [{ address: iota.utils.addChecksum(address), value: parseInt(value, 10) }];
    return new Promise(function(resolve, reject) {
      iota.api.sendTransfer(seed, 5, 9, transfers, (e, r) => {
        if (e !== null) {
          console.log(e);
          reject(e);
        } else {
          resolve(r);
        }
      });
    });
  } catch (e) {
    throw Error('Device address is invalid');
  }
};

export const getBalance = async address => {
  try {
    const packet = {
      command: 'getBalances',
      addresses: [`${address.substring(0, 81)}`],
      threshold: 100,
    };

    const result = await api('', packet);
    return result.balances[0];
  } catch (e) {
    return 0;
  }
};

export const reducer = amount => {
  if (amount < Math.pow(10, 3)) {
    const num = amount;
    if (num % 1 !== 0) return num.toFixed(2) + 'i';
    return num + 'i';
  } else if (amount < Math.pow(10, 6)) {
    const num = amount / Math.pow(10, 3);
    if (num % 1 !== 0) return num.toFixed(2) + 'Ki';
    return num + 'Ki';
  } else if (amount < Math.pow(10, 9)) {
    const num = amount / Math.pow(10, 6);
    if (num % 1 !== 0) return num.toFixed(2) + 'Mi';
    return num + 'Mi';
  } else if (amount < Math.pow(10, 12)) {
    const num = amount / Math.pow(10, 9);
    if (num % 1 !== 0) return num.toFixed(2) + 'Gi';
    return num + 'Gi';
  } else if (amount < Math.pow(10, 15)) {
    const num = amount / Math.pow(10, 12);
    if (num % 1 !== 0) return num.toFixed(2) + 'Ti';
    return num + 'Ti';
  }
};

const generateSeed = length => {
  if (window.crypto && window.crypto.getRandomValues) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    let result = '';
    let values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    values.forEach(value => (result += charset[value % charset.length]));
    return result;
  } else throw new Error("Your browser is outdated and can't generate secure random numbers");
};

export const generateDeviceAddress = callback => {
  iota.api.getNewAddress(generateSeed(81), {}, (error, address) => {
    if (error) throw error;
    callback(address);
  });
};
