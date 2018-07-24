import JSZip from 'jszip';
import FileSaver from 'file-saver';
import config from '../config.json';

const getFileContent = path => {
  return new Promise((resolve, reject) => {
    try {
      const rawFile = new XMLHttpRequest();
      rawFile.open('GET', path, false);
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
          resolve(rawFile.responseText);
        }
      };
      rawFile.send(null);
    } catch (error) {
      reject(error);
    }
  });
};

export const getZip = async device => {
  const zip = new JSZip();
  zip.file('config.json', getConfigFileContent());
  zip.file('index.js', getIndexFileContent(device));
  zip.file('package.json', await getFileContent('/static/template/package.json'));
  zip.file('README.md', await getFileContent('/static/template/README.md'));
  zip.file('keyStorage.js', await getFileContent('/static/template/keyStorage.js'));
  zip.file('iota.js', await getFileContent('/static/template/iota.js'));
  zip.file('data.json', await getFileContent('/static/template/data.json'));

  // when everything has been downloaded, we can trigger the dl
  zip
    .generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
    })
    .then(
      blob => {
        FileSaver.saveAs(blob, device.sensorId + '-template.zip');
      },
      e => {
        console.log('getZip error', e);
        // showError(e)
      }
    );
};

const getConfigFileContent = () => `{
  "provider": "${config.provider}",
  "endpoint": "https://${config.api}.${config.domainName}/newData",
  "serverUrl": "https://swapi.co/api/vehicles/"
}
`;

const getIndexFileContent = device => {
  return `const fetch = require('node-fetch');
const pick = require('lodash/pick');
const { publish } = require('./iota');
const { storeKey } = require('./keyStorage');
const { serverUrl } = require('./config.json');
const data = require('./data.json');

// Set Varibles
const debug = true; // Set to 'false' to publish data live
const sensorId = '${device.sensorId}'; // Your device ID is here.
const secretKey = '${device.sk}'; // Your device's secret key here

// Push key to data marketplace.
const pushKey = async (root, sidekey) => {
  if (debug) return 'Debug mode';
  const response = await storeKey(root, sidekey, sensorId, secretKey);
  return response;
}

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
      pushKey
    );
  }
});

// EXAMPLE 2: request data from server or sensor
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
Array.from(Array(10), async () => {
  // Access public server. URL is configurable in config.json
  // In this example a Star Wars API is used for demo purposes
  const resp = await fetch(serverUrl + getRandomInt(73)); // construct URL to request a random star wars vehicle
  const json = await resp.json();
  if (!(json.detail && json.detail === 'Not found')) {
    const payload = pick(json, ['name', 'model', 'manufacturer', 'vehicle_class']);
    if (debug) {
      console.log({ time: Date.now(), data: { ...payload } });
    } else {
      // Publish sensor data to marketplace
      publish(
        {
          time: Date.now(),
          data: { ...payload }, // your sensor data goes here. Payload is any content in JSON format
        },
        pushKey
      );
    }
  }
});
`;
};
