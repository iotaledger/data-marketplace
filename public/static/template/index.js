const fetch = require('node-fetch');
const { publish } = require('./iota');
const { storeKey } = require('./keyStorage');
const { debug, serverUrl } = require('./config.json');
const data = require('./data.json');

// EXAMPLE 1: read static data from file/database
data.map(payload => {
  if (debug) {
    console.log({ time: Date.now(), data: { ...payload } });
  } else {
    // Publish sensor data to marketplace
    publish(
      {
        time: Date.now(),
        data: { ...payload }, // your sensor data goes here. Payload is any content in JSON format
      },
      storeKey
    );
  }
});

// EXAMPLE 2: request data from server or sensor
Array.from(Array(10), async () => {
  // Access public server. URL is configurable in config.json
  // In this example a Star Wars API is used for demo purposes
  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
  const resp = await fetch(serverUrl + getRandomInt(73)); // construct URL to request a random star wars vehicle
  const json = await resp.json();
  if (!(json.detail && json.detail === 'Not found')) {
    const { name, model, manufacturer, vehicle_class } = json;
    const payload = { name, model, manufacturer, vehicle_class };
    if (debug) {
      console.log({ time: Date.now(), data: { ...payload } });
    } else {
      // Publish sensor data to marketplace
      publish(
        {
          time: Date.now(),
          data: { ...payload }, // your sensor data goes here. Payload is any content in JSON format
        },
        storeKey
      );
    }
  }
});
