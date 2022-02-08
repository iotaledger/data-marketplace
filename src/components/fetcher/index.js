import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { mamFetch, TrytesHelper } from '@iota/mam.js';
import { SingleNodeClient } from '@iota/iota.js';
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
        setFetching(false);
        return setNotification('streamReadFailure', deviceId);
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
      const sensorData = await getSensorData(mamStreamData);
      // Remove pruned (undefined) data packages
      const filteredSensorData = sensorData.filter(data =>  data);
      setFetching(false);

      // Display error message if the whole data stream has been pruned
      if (filteredSensorData.length === 0 && packets === 0) {
        setPurchase(false);
        setFetching(false);
        console.error('Stream empty');
        return setNotification('streamReadFailure', deviceId);
      }
      setPurchase(true);
      setStreamLength(filteredSensorData.length);
      filteredSensorData.length && saveData(filteredSensorData);
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
      const message = await mamFetch(new SingleNodeClient(nodeURL), root, mode, sidekey);
      // Case when data has been pruned
      if (message === undefined) {
        return resolve(undefined);
      }
      const decoded = decodeURIComponent(TrytesHelper.toAscii(message.message));
      resolve(JSON.parse(decoded));
    });
  };

  return null;
};

export default Fetcher;
