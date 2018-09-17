import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { domain } from '../config.json';

const getFileContent = path => {
  return new Promise((resolve, reject) => {
    try {
      const rawFile = new XMLHttpRequest();
      rawFile.open('GET', path);
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
          resolve(rawFile.responseText);
        }
      };
      rawFile.send(null);
    } catch (error) {
      console.error('getFileContent error', error);
      reject(error);
    }
  });
};

const getConfigFileContent = (device, provider) => `{
  "sensorId": "${device.sensorId}",
  "secretKey": "${device.sk}",
  "debug": true,
  "provider": "${provider}",
  "endpoint": "${domain}/newData",
  "serverUrl": "https://swapi.co/api/vehicles/"
}`;

export const getZip = async (device, provider) => {
  const zip = new JSZip();
  zip.file('config.json', getConfigFileContent(device, provider));
  zip.file('package.json', await getFileContent('/static/template/package.json'));
  zip.file('README.md', await getFileContent('/static/template/README.md'));
  zip.file('keyStorage.js', await getFileContent('/static/template/keyStorage.js'));
  zip.file('iota.js', await getFileContent('/static/template/iota.js'));
  zip.file('index.js', await getFileContent('/static/template/index.js'));
  zip.file('data.json', await getFileContent('/static/template/data.json'));

  // when everything has been downloaded, we can trigger the dl
  zip
    .generateAsync({ type: 'blob', compression: 'DEFLATE' })
    .then(
      blob => FileSaver.saveAs(blob, device.sensorId + '-template.zip'),
      error => console.error('getZip error', error)
    );
};
