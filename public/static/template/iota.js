const crypto = require('crypto');
const Mam = require('@iota/mam');
const { asciiToTrytes } = require('@iota/converter');
const { storeKey } = require('./keyStorage');
const { provider } = require('./config.json');

// Initialise MAM State
let mamState = Mam.init(provider);

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
  const trytes = asciiToTrytes(JSON.stringify(packet));

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
