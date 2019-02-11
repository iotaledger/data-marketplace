import { useContext, useEffect } from 'react';
import { trytesToAscii } from '@iota/converter';
import { Reader, Mode } from 'mam.client.js/lib/mam';
import get from 'lodash-es/get';
import { SensorContext } from '../../pages/sensor';

const Fetcher = ({ data, saveData }) => {
  const { throwError, ctx, client, dataEnd } = useContext(SensorContext);

  useEffect(() => {
    (async () => {
      try {      
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
                throwError({
                  body: 'Sensor data is missing or too old.',
                  heading: 'No data',
                }, true);
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
        dataEnd(true);
      }
    })();
  }, [data]);

  return null;
}

export default Fetcher;

