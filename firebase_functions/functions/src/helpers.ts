import * as crypto from 'crypto';
const request = require('request'); // node module to send HTTP requests

exports.generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

exports.seedGen = (length = 81) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  const values = crypto.randomBytes(length).toString('hex');
  let result = '';
  Array(length)
    .fill('')
    .map((_, i) => (result += charset[values.charCodeAt(i) % charset.length]));
  return result;
};

exports.sanatiseObject = (device: any) => {
  if (!device.sensorId) return 'Please enter a device ID. eg. company-32';
  if (!device.type) return 'Specify type of device. eg. Weather station or Wind Vein';
  if (!device.location || !device.location.city || !device.location.country)
    return 'Enter city or country';
  if (!device.lat || !device.lon) return 'Please enter a device coordinates';
  if (!device.dataTypes || device.dataTypes.length < 1) return 'You must have a valid data fields';
  if (!device.owner) return 'You must specify an owner';
  if (!device.address) return 'You must specify an address';
  if (!device.value) return 'You must specify a price';
  return false;
};

exports.findTx = (packet, IOTA) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: 'https://testnet140.tangle.works',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-IOTA-API-Version': 'POTATO',
        },
        body: JSON.stringify({
          command: 'getTrytes',
          hashes: packet.hashes,
        }),
      },
      (error, resp, body) => {
        if (body) {
          const response = JSON.parse(body);
          const txBundle = response.trytes.map(trytes => IOTA.utils.transactionObject(trytes));
          resolve(txBundle);
        } else {
          console.log(`findTx failed. Couldn't find your transaction`);
          throw Error(`Couldn't find your transaction!`);
          reject();
        }
      }
    );
  });
};
