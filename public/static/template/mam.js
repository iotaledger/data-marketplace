const { asciiToTrytes } = require('@iota/converter');
const {
  createChannel,
  createMessage,
  mamAttach
} = require('@iota/mam.js');
const crypto = require('crypto');
const { storeKey } = require('./keyStorage');
const { provider } = require('./config.json');

// Initialise MAM State
// let mamState;
// let secretKey;
let seed;

// Random Key Generator
const generateRandomKey = length => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  let key = '';
  while (key.length < length) {
    const byte = crypto.randomBytes(1);
    if (byte[0] < 243) {
      key += charset.charAt(byte[0] % 27);
    }
  }
  return key;
};

exports.publish = async (payload, mode = 'restricted', tag = 'SENSORDATA') => {
  const time = Date.now();
  const packet = { time, data: { ...payload } };
  let mamState;
  let secretKey;
  if (!seed) {
    seed = generateRandomKey(81);
  }
  try {
    // Change MAM encryption key on each loop
    secretKey = generateRandomKey(81);
    // Create channel with stored seed & update secretKey
    const security = 2;
    mamState = createChannel(seed, security, mode, secretKey);
  } catch (e) {
    console.error("Could not create MAM channel ", e)
  }

  let message;
  try {
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(encodeURI(JSON.stringify(packet)));
    message = createMessage(mamState, trytes);
    // Attach the payload
    console.log("Message", message.root, message.address)
    console.log("Provider", provider)
    console.log("Mam state", mamState)
    const bundle = await mamAttach(provider, message, tag);
    console.log("Bundle", bundle.messageId)
  } catch (e) {
    console.error("Could not attach message to mam stream", e)
  }

  // Store encryption key in Firebase
  let callbackResponse;
  try {
    callbackResponse = await storeKey(secretKey, message.root, time);
  } catch (e) {
    console.log("Could not store key", e)
  }

  console.log('Payload:', packet);
  console.log(callbackResponse);
  console.log('==============================================================');
};
