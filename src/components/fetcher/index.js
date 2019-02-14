import { useEffect, useState } from 'react';
import { trytesToAscii } from '@iota/converter';
import { Reader, Mode } from 'mam.client.js/lib/mam';
import get from 'lodash-es/get';
import { getData } from '../../utils/iota';

const Fetcher = ({
  ctx, client, packets, lastFetchedTimestamp, deviceId, userId,
  setNotification, setPurchase, setStreamLength, setFetching, setDataEnd, saveData
}) => {
  const [fetchedData, setFetchedData] = useState(packets);

  useEffect(() => {
    (async () => {
      try {     
        const data = await getData(userId, deviceId, lastFetchedTimestamp);
    
        if (typeof data === 'string' && data === 'Please purchase the stream') {
          setPurchase(false);
          setFetching(false);
          return setNotification('purchase');
        }

        if (!fetchedData && (!data.length || !data[0])) {
          setFetching(false);
          return setNotification('streamReadFailure');
        }

        setFetchedData(!!data.length);
        setPurchase(true);
        setStreamLength(packets + data.length);

        let fetchErrorCounter = 0;
        let emptyDataCounter = 0;
  
        data && data.map(async ({ root, sidekey, time = null }) => {
          try {
            const mode = sidekey ? Mode.Old : Mode.Public;
            const reader = new Reader(ctx, client, mode, root, sidekey || '9'.repeat(81));
            const message = await reader.next();
            const payload = get(message, 'value[0].message.payload');
            if (payload) {
                saveData(JSON.parse(trytesToAscii(payload)), time);
            } else {
              emptyDataCounter++;
              if (emptyDataCounter > data.length * 0.5) {
                setNotification('dataReadingFailure');
              }
            }
          } catch (error) {
            fetchErrorCounter++;
            console.error('fetchMam error 1', fetchErrorCounter, data.length, error);
            if (fetchErrorCounter > data.length * 0.8) {
              window.location.reload(true);
            }
          }
        });
      } catch (error) {
        console.error('fetchMam error 2', error);
        setDataEnd(true);
      }
    })();
  }, [packets]);

  return null;
}

export default Fetcher;

