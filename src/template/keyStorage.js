const fetch = require('node-fetch')
const { endpoint } = require('./config.json')

// Push keys to market place.
const storeKey = async (root, sidekey, sensorId, secretKey) => {
  const packet = {
    sidekey,
    root,
    time: Date.now(),
  }
  try {
    // Initiate Fetch Call
    const resp = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: sensorId, packet, sk: secretKey }),
    })
    return resp.json()
  } catch (error) {
    console.log('storeKey error', error)
    return error
  }
}

module.exports = {
  storeKey,
}
