import { useEffect } from 'react';
import { trytesToAscii } from '@iota/converter';
import ReactGA from 'react-ga';
import { getData } from '../../utils/iota';
import { mamFetch } from '@iota/mam.js';
import { nodeURL } from '../../config.json';

const Fetcher = ({
  packets, lastFetchedTimestamp, deviceId, userId,
  setNotification, setPurchase, setStreamLength, setFetching, setDataEnd, saveData
}) => {

  useEffect(() => {
    (async () => {
      let mamStreamData;
      try {
        mamStreamData = await getData(userId, deviceId, lastFetchedTimestamp);
        if (mamStreamData.success === false) {
          setPurchase(false);
          setFetching(false);
          return setNotification('purchase');
        }
      } catch (e) {
        console.error('Could not get mamStreamData', e);
        setDataEnd(true);
      }
      console.log("Packets: ", packets)
      console.log(packets === 0)
        if ((!mamStreamData.length || !mamStreamData[0]) && packets === 0) {
          ReactGA.event({
            category: 'Stream read failure',
            action: 'Stream read failure',
            label: `Sensor ID ${deviceId}`
          });
          setFetching(false);
          return setNotification('streamReadFailure', deviceId);
        }
        let sensor_data_packets = await getSensorData(mamStreamData)
        console.log(sensor_data_packets)
        setFetching(false);
        setPurchase(true);      
        setStreamLength(sensor_data_packets.length)
        sensor_data_packets.length && saveData(sensor_data_packets);      
    })();
  }, []);

  const getSensorData = async mamStreamData => {
    return Promise.all(mamStreamData.map(async ({ root, sidekey }) => {
      return fetchMamStream(root, sidekey);
    }));
  }

  const fetchMamStream = (root, sidekey, mode = 'restricted') => {
    return new Promise(async (resolve, reject) => {
      try {
        const message = await mamFetch(nodeURL, root, mode, sidekey)
        const trytes = trytesToAscii(message.message)
        const decoded = decodeURIComponent(trytes)
        console.log(decoded)
        resolve(JSON.parse(decoded));
      } catch (e) {
        console.error('Could not fetch mam stream:', e);
        reject();
      }
    })
  }

  return null;
}

export default Fetcher;
