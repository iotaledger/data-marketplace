import { useEffect, useState } from 'react';
import { trytesToAscii } from '@iota/converter';
import { Reader, Mode } from '@iota/mam/lib/mam';
import get from 'lodash-es/get';
import ReactGA from 'react-ga';
import { getData } from '../../utils/iota';
import { mamFetch } from '@iota/mam.js'

const Fetcher = ({
  ctx, client, packets, lastFetchedTimestamp, deviceId, userId,
  setNotification, setPurchase, setStreamLength, setFetching, setDataEnd, saveData
}) => {
  const [fetchedData, setFetchedData] = useState(packets);

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(userId, deviceId, lastFetchedTimestamp);
        if (data.success === false) {
          setPurchase(false);
          setFetching(false);
          return setNotification('purchase');
        }

        if (!fetchedData && (!data.length || !data[0])) {
          ReactGA.event({
            category: 'Stream read failure',
            action: 'Stream read failure',
            label: `Sensor ID ${deviceId}`
          });

          setFetching(false);
          return setNotification('streamReadFailure', deviceId);
        }

        setFetchedData(!!data.length);
        setPurchase(true);
        setStreamLength(packets + data.length);

        let fetchErrorCounter = 0;
        let emptyDataCounter = 0;
        console.log("FUNCTION CALL +++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        data && data.map(async ({ root, sidekey, time = null }) => {
          try {

            const message  = await mamFetch('https://api.lb-0.testnet.chrysalis2.com', root, 'restricted', sidekey)
            // console.log('message', message.)
            // const decodedMessage = parseMessage(message, root, sidekey)
            
            // console.log("Decoded message", decodedMessage)
            const trytes = trytesToAscii(message.message)
            console.log("Trytes: ", trytes)
            const decoded = decodeURIComponent(trytes)
            console.log("decoded:", decoded)
            if (decoded) {
                saveData(JSON.parse(decoded), time);
            } else {
              emptyDataCounter++;
              if (emptyDataCounter > data.length * 0.5) {
                ReactGA.event({
                  category: 'Data read failure',
                  action: 'Data read failure',
                  label: `Sensor ID ${deviceId}`
                });

                setNotification('dataReadingFailure', deviceId);
              }
            }
          } catch (error) {
            fetchErrorCounter++;
            console.error('fetchMam error 1', fetchErrorCounter, error );
            if (fetchErrorCounter > data.length * 0.8) {
              ReactGA.event({
                category: 'MAM fetch failure 1',
                action: 'MAM fetch failure 1 + reload',
                label: `Sensor ID ${deviceId}, error: ${error}`
              });
              // window.location.reload(true);
            }
          }
        });
      } catch (error) {
        console.error('fetchMam error 2', error);
        setDataEnd(true);
        ReactGA.event({
          category: 'MAM fetch failure 2',
          action: 'MAM fetch failure 2',
          label: `Sensor ID ${deviceId}, error: ${error}`
        });
      }
    })();
  }, []);

  return null;
}

export default Fetcher;
