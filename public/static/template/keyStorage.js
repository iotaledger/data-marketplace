const fetch = require('node-fetch');
const { debug, endpoint, secretKey, sensorId } = require('./config.json');

// Push key to data marketplace.
const storeKey = async (root, sidekey) => {
  if (debug) return 'Debug mode';

  const packet = {
    sidekey,
    root,
    time: Date.now(),
  };
  try {
    // Initiate Fetch Call
    const resp = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: sensorId, packet, sk: secretKey }),
    });
    return resp.json();
  } catch (error) {
    console.log('storeKey error', error);
    return error;
  }
};

module.exports = {
  storeKey,
};
