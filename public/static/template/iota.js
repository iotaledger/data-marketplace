const crypto = require('crypto');
const Mam = require('mam.client.js');
const IOTA = require('iota.lib.js');
const { storeKey } = require('./keyStorage');
const { provider } = require('./config.json');
const iota = new IOTA({ provider });

// Initialise MAM State
let mamState = Mam.init(iota);

// Random Key Generator
const generateRandomKey = length => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  const values = crypto.randomBytes(length);
  return Array.from(new Array(length), (x, i) => charset[values[i] % charset.length]).join('');
};

// Publish to Tangle
exports.publish = async payload => {
  const time = Date.now();
  const packet = { time, data: { ...payload } };

  // Change MAM encryption key on each loop
  let mamKey = generateRandomKey(81);

  // Set channel mode & update key
  mamState = Mam.changeMode(mamState, 'restricted', mamKey);

  // Create Trytes
  const trytes = iota.utils.toTrytes(JSON.stringify(packet));

  // Get MAM payload
  const message = Mam.create(mamState, trytes);

  // Save new mamState
  mamState = message.state;

  // Attach the payload.
  await Mam.attach(message.payload, message.address);

  // console.log('Address:', message.address);
  // console.log('Attached Message:', message.state);

  // Store encryption key in Firebase
  const callbackResponse = await storeKey(mamKey, message.root, time);

  console.log('Payload:', packet);
  console.log(callbackResponse);
  console.log('==============================================================');
};
