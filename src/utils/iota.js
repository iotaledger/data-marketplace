import api, { fetchData } from './api';

export const getBundleHashes = async(sensor, userId, setNotification) => {
  // Try purchase
  try {
    const packet = {
      userId,
      address: sensor.address,
      value: Number(sensor.price),
    };

    const bundleHashesResult = await api('purchaseData', packet);
    if (bundleHashesResult && bundleHashesResult.transactions) {
      setNotification('fetching');
      return bundleHashesResult.transactions;
    }
    return null;
  } catch (error) {
    console.error('getBundleHashes error', error);
    setNotification('purchaseFailed', error.message);
  }
}

export const updateBalance = async (userId, deviceId) => {
  // Update wallet balance
  const balanceUpdateResponse = await api('updateBalance', { userId, deviceId });
  return balanceUpdateResponse;
}

export const purchaseStream = async(bundleHashes, userId, deviceId) => {
  const hashes = bundleHashes && bundleHashes.map(bundle => bundle.hash);
  const packet = { userId, deviceId, hashes };
  const purchaseStreamResponse = await api('purchaseStream', packet);
  return purchaseStreamResponse;
}

export const getData = async (userId, deviceId, time) => {
  try {
    const result = await getPackets(userId, deviceId, time);
    if (result.purchase && !result.purchase.full) {
      const packets = await getPacketsPartial(result.purchase);
      return packets;
    } else if (result.error) {
      return result.error;
    } else {
      return result.data;
    }
  } catch (error) {
    console.error('getData error', error);
    return null;
  }
};

const getPackets = (userId, deviceId, time) => {
  return new Promise(async (resolve, reject) => {
    const packets = await api('queryStream', { userId, deviceId, time });
    if (packets) {
      resolve(packets);
    } else {
      reject('No packets purchased');
    }
  });
};

const getPacketsPartial = data => {
  return new Promise((resolve, reject) => {
    const packets = [];
    data.packets.map(ref =>
      ref.get().then(item => {
        if (item.exists) {
          packets.push(item.data());
          if (packets.length === data.packets.length) {
            resolve(packets);
          }
        } else {
          packets.push([]);
          if (packets.length === data.packets.length) {
            resolve(packets);
          }
        }
      })
    );
  });
};

export const getBalance = async (address, provider) => {
  try {
    const packet = {
      command: 'getBalances',
      addresses: [address.substring(0, 81).toUpperCase()],
      threshold: 100,
    };

    const result = await fetchData(provider, packet);
    if (result && result.balances && result.balances.length > 0) {
      return result.balances[0];
    }
    return 0;
  } catch (error) {
    console.error('getBalance error', error);
    return 0;
  }
};
