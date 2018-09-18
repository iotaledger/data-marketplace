import * as crypto from 'crypto';
const axios = require('axios');
const { composeAPI, createPrepareTransfers, generateAddress } = require('@iota/core');
const { asTransactionObject } = require('@iota/transaction-converter');
const {
  getSettings,
  updateWalletAddressKeyIndex,
  getIotaWallet,
} = require('./firebase');

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

const generateNewAddress = (seed, checksum = false) => {
  return generateAddress(seed, 0, 2, checksum);
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

const findTx = (hashes, provider, iotaApiVersion) => {
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
        const txBundle = response.data.trytes.map(trytes => asTransactionObject(trytes));
        resolve(txBundle);
      })
      .catch(error => {
        console.log(`findTx failed. Couldn't find your transaction`);
        throw Error(`Couldn't find your transaction!`);
        reject();
      });
  });
};

const transferFunds = async receiveAddress => {
  try {
    const { provider } = await getSettings();
    const { getBalances } = composeAPI({ provider });
    const prepareTransfers = createPrepareTransfers();
    const { address, keyIndex, seed, defaultBalance } = await getIotaWallet();
    const { balances } = await getBalances([ address ], 100);
    const balance = balances && balances.length > 0 ? balances[0] : null;
    const security = 2;

    const promise = new Promise((resolve, reject) => {
      const transfers = [{ address: receiveAddress, value: defaultBalance }];
      const remainderAddress = generateAddress(seed, keyIndex + 1);
      const options = {
        inputs: [{
          address,
          keyIndex,
          security,
          balance
        }],
        security,
        remainderAddress
      }

      prepareTransfers(seed, transfers, options)
        .then(async trytes => {
          await updateWalletAddressKeyIndex(remainderAddress, keyIndex + 1);
          resolve(trytes);
        })
        .catch(error => {
          console.log('transferFunds error', error);
          reject(error);
        });
    });
    return promise;
  } catch (error) {
    console.log('transferFunds error', error);
    return error
  }
}

const faucet = async address => {
  return await transferFunds(address);
};

const initWallet = async () => {
  const seed = generateSeed();
  const keyIndex = 0;
  const address = generateNewAddress(seed, true);
  const { defaultBalance } = await getIotaWallet();
  const trytes = await transferFunds(address);
  return { trytes, wallet: { address, seed, keyIndex, balance: defaultBalance }};
};

const checkRecaptcha = async (captcha, emailSettings) => {
  const response = await axios({
    method: 'post',
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${emailSettings.googleSecretKey}&response=${captcha}`,
  });
  return response ? response.data : null;
};


module.exports = {
  generateUUID,
  generateNewAddress,
  generateSeed,
  sanatiseObject,
  findTx,
  initWallet,
  faucet,
  checkRecaptcha,
}
