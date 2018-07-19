import IOTA from 'iota.lib.js';
import curl from 'curl.lib.js';
import config from '../config.json';
require('isomorphic-fetch');

export const iota = new IOTA({ provider: config.provider });

export const initWallet = async () => {
  var response = await fetch(config.provider);
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
    var transfers = [{ address: iota.utils.addChecksum(address), value: parseInt(value, 10) }];
  } catch (e) {
    throw Error('Device address is invalid');
  }

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
};

export const getBalance = async address => {
  var packet = `{"command": "getBalances", "addresses": ["${address.substring(
    0,
    81
  )}"], "threshold": 100}`;
  try {
    const response = await fetch(`https://${config.api}.marketplace.tangle.works/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': 1,
      },
      body: packet,
    });

    const result = await response.json();
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

export const generateSeed = length => {
  if (window.crypto && window.crypto.getRandomValues) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    let result = '';
    let values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    values.forEach(value => (result += charset[value % charset.length]));
    return result;
  } else throw new Error("Your browser is outdated and can't generate secure random numbers");
};

export const generateDeviceAddress = (seed, callback) => {
  iota.api.getNewAddress(seed, {}, (error, address) => {
    if (error) throw error;
    callback(address);
  });
};
