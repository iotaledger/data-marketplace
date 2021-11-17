import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { mamFetch, TrytesHelper } from '@iota/mam.js';
import { SingleNodeClient }from '@iota/iota.js';
import { getData } from '../../utils/iota';
import { nodeURL } from '../../config.json';

const Fetcher = ({
  packets,
  lastFetchedTimestamp,
  deviceId,
  userId,
  setNotification,
  setPurchase,
  setStreamLength,
  setFetching,
  setDataEnd,
  saveData
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
      if ((!mamStreamData.length || !mamStreamData[0]) && packets === 0) {
        ReactGA.event({
          category: 'Stream read failure',
          action: 'Stream read failure',
          label: `Sensor ID ${deviceId}`
        });
        setFetching(false);
        return setNotification('streamReadFailure', deviceId);
      }
      let sensor_data_packets = await getSensorData(mamStreamData);
      setFetching(false);
      setPurchase(true);
      setStreamLength(sensor_data_packets.length);
      sensor_data_packets.length && saveData(sensor_data_packets);
    })();
  }, []);

  const getSensorData = async (mamStreamData) => {
    return Promise.all(
      mamStreamData.map(async ({ root, sidekey }) => {
        return fetchMamStream(root, sidekey);
      })
    );
  };

  const fetchMamStream = (root, sidekey, mode = 'restricted') => {
    return new Promise(async (resolve, reject) => {
      try {
        const message = await mamFetch(new SingleNodeClient(nodeURL), root, mode, sidekey);
        if (message === undefined) {
          console.error('Could not fetch mam stream')
          throw new Error('Could not fetch mam stream')
        }
        const decoded = decodeURIComponent(TrytesHelper.toAscii(message.message));
        resolve(JSON.parse(decoded));
      } catch (e) {
        console.error('Could not fetch mam stream:', e);
        reject();
      }
    });
  };

  return null;
};

export default Fetcher;
