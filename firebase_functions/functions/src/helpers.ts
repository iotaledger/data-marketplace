import * as crypto from 'crypto';
const iotaCore = require('@iota/core');
const IOTA = require('iota.lib.js');
const axios = require('axios');
const { provider, iotaApiVersion } = require('../config.json');
const { getWalletSeed, getDefaultBalance, updateWalletAddress } = require('./firebase');

const generateSeed = (length = 81) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let seed = '';
  while (seed.length < length) {
    const byte = crypto.randomBytes(1)
    if (byte[0] < 243) {
      seed += charset.charAt(byte[0] % 27);
    }
  }
  return seed;
};

const generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

const generateAddress = seed => {
  return iotaCore.generateAddress(seed, 0, 2);
};

const sanatiseObject = (device: any) => {
  if (!device.sensorId) return 'Please enter a device ID. eg. company-32';
  if (!device.type) return 'Specify type of device. eg. Weather station or Wind Vein';
  if (!device.location || !device.location.city || !device.location.country)
    return 'Enter city or country';
  if (!device.lat || !device.lon) return 'Please enter a device coordinates';
  if (!device.dataTypes || device.dataTypes.length < 1) return 'You must have a valid data fields';
  if (!device.owner) return 'You must specify an owner';
  return false;
};

const findTx = (hashes, iota) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: provider,
      headers: {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': iotaApiVersion,
      },
      data: {
        command: 'getTrytes',
        hashes,
      },
    })
      .then(response => {
        const txBundle = response.data.trytes.map(trytes => iota.utils.transactionObject(trytes));
        console.log('txBundle', txBundle);
        resolve(txBundle);
      })
      .catch(error => {
        console.log(`findTx failed. Couldn't find your transaction`);
        throw Error(`Couldn't find your transaction!`);
        reject();
      });
  });
};

const transferFunds = async (seed, address, value) => {
  try {
    const iota = new IOTA({ provider });
    const promise = new Promise((resolve, reject) => {
      // Depth or how far to go for tip selection entry point
      const depth = 3

      // Difficulty of Proof-of-Work required to attach transaction to tangle.
      // Minimum value on mainnet & spamnet is `14`, `9` on devnet and other testnets.
      const minWeightMagnitude = 9

      const transfers = [{ address: iota.utils.addChecksum(address), value }];

      iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfers, (error, transactions) => {
        if (error !== null) {
          console.error('transferFunds error', error);
          reject(error);
        } else {
          const newWalletAddress = transactions[transactions.length - 1].address;
          updateWalletAddress(newWalletAddress);
          resolve(transactions);
        }
      });
    });
    return promise;
  } catch (error) {
    console.error('transferFunds error', error);
    return error
  }
}

const initWallet = async () => {
  const seed = generateSeed();
  const address = generateAddress(seed);
  const iotaWalletSeed = await getWalletSeed();
  const balance = await getDefaultBalance();
  const response = await transferFunds(iotaWalletSeed, address, balance);
  return { address, balance, seed };
};

module.exports = {
  generateUUID,
  generateAddress,
  generateSeed,
  sanatiseObject,
  findTx,
  transferFunds,
  initWallet,
}
