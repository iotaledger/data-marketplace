const fetch = require('node-fetch');
const { debug, endpoint, secretKey, sensorId } = require('./config.json');

// Push key to data marketplace.
exports.storeKey = async (sidekey, root, time) => {
  if (debug) return 'Debug mode';

  const packet = {
    sidekey,
    root,
    time,
  };

  try {
    // Initiate Fetch Call
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: sensorId, packet, sk: secretKey }),
    });
    return await resp.json();
  } catch (error) {
    console.log('storeKey error', error);
    return error;
  }
};
