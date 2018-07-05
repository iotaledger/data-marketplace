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
  "endpoint": "https://${config.api}.marketplace.tangle.works/newData",
}
`;

const getIndexFileContent = device => {
  return `const { publish } = require('./iota')
const { storeKey } = require('./keyStorage')

// Set Varibles
const debug = true // Set to 'false' to publish data live
const sensorId = '${device.sensorId}' // Your device ID is here.
const secretKey = '${device.sk}' // Your device's secret key here

// Push key to data marketplace.
const pushKey = async (root, sidekey) => {
  if (debug) {
    return 'Debug mode'
  }
  const response = await storeKey(root, sidekey, sensorId, secretKey)
  return response
}

// Emulate data being ingested
Array(4)
  .fill()
  .map((_, i) =>
    publish({
      time: Date.now(),
      // Change below to read actual values!
      data: {
    ${device.dataTypes.map(type => `    ${type.id}: 'PUT "${type.name}" READING IN HERE', \n`)}
      }
    }, pushKey)
  )
`;
};
