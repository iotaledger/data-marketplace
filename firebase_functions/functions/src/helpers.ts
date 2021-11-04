import * as crypto from 'crypto';
const axios = require('axios');
import { v4 as uuidv4 } from 'uuid';
import { Client, ClientBuilder } from '@iota/client';
import { getUserWallet, getSettings, getIotaWallet, getGoogleMapsApiKey, getSk } from './firebase';
import { BalanceOnlyWallet, InitializedWallet } from './models/wallet';
const iotaAreaCodes = require('@iota/area-codes');

/**
 * Initializes client with devnet mqtt node
 * @returns Client: https://client-lib.docs.iota.org/docs/libraries/nodejs/api_reference#clientbuilder
 */
let client;
const getClient = async (): Promise<Client> => {
  if (client) return client;
  const settings = await getSettings();
  client = new ClientBuilder().node(settings.provider).localPow(false).build();
  return client;
};

/**
 * Generates a new 32-byte (256-bit) uniformly randomly generated seed
 * @returns Hex seed of 64 char length (32 bytes encoded in hexadecimal)
 */
const generateSeed = (): string => {
  return crypto.createHash('sha256').update(crypto.randomBytes(256)).digest('hex');
};

/**
 * Generates an address with a given seed
 * @param seed to use when generating the address
 * @param accountIndex defaults to 0, not needed in most cases
 * @returns address
 */
const generateAddress = async (seed: string, accountIndex = 0): Promise<string> => {
  const client = await getClient();
  const addresses = await client.getAddresses(seed).accountIndex(accountIndex).range(0, 1).get();
  // safe assertion since includeInternal() is not used and thus addresses is a string[]
  const address = addresses[0] as string;
  return address;
};

/**
 * Create an RFC version 4 (random) UUID
 * @returns UUID String e.g. 'a70647d1-3f56-43f5-8382-ca8cb06659a7
 */
const generateUUID = (): string => {
  const uuid = uuidv4();
  return uuid;
};

const sanatiseObject = (device: any) => {
  if (!device.sensorId) return 'Please enter a device ID. eg. company-32';
  if (!device.type) return 'Specify type of device. eg. Weather station or Wind Vein';
  if (!device.location || !device.location.city || !device.location.country) return 'Enter city or country';
  if (!device.lat || !device.lon) return 'Please enter a device coordinates';
  if (!device.dataTypes || device.dataTypes.length < 1) return 'You must have a valid data fields';
  if (!device.owner) return 'You must specify an owner';
  return false;
};

/**
 * Gets the balance of specified address
 * @param address
 * @returns balance in iota
 */
const getBalance = async (address: string): Promise<number> => {
  try {
    const client = await getClient();
    const { balance } = await client.getAddressBalance(address);
    return balance;
  } catch (error) {
    console.error('Could not get balance', error);
    throw Error('Could not get balance');
  }
};

/**
 * Transfers token from one address to another address
 * @param receiveAddress address of token receiver
 * @param address address of token sender
 * @param seed seed of the sender
 * @param tokens amount of tokens to transfer
 * @returns messageId
 */
const transferFunds = async (
  receiveAddress: string,
  address: string,
  seed: string,
  tokens: number,
  dustAllowanceOutput: boolean
): Promise<string> | null => {
  const client = await getClient();
  const balance = await getBalance(address);
  if (balance < tokens) {
    console.error('transferFunds. Insufficient balance', address, balance);
    throw Error(`transferFunds. Insufficient balance on address: ${address}`);
  }
  try {
    const messageSender = client.message().seed(seed);
    let message;
    if (dustAllowanceOutput) {
      message = await messageSender.dustAllowanceOutput(receiveAddress, tokens).submit();
    } else {
      message = await messageSender.output(receiveAddress, tokens).submit();
    }
    const messageId = message.messageId;
    return messageId;
  } catch (e) {
    if (e.message.includes('DustError')) {
      console.error('transferFunds error ', e);
      throw Error(`No dust output allowed on address ${receiveAddress}`);
    }
    console.error('Could not transfer funds: ', e);
    throw Error('Could not transfer funds');
  }
};

/**
 * Transfers the whole address balance to own address to combine ouputs into a new dust allowance output
 * @param address of the user to combine the outputs from
 * @returns messageId
 */
const combineOutputs = async (address: string, seed: string): Promise<string> => {
  try {
    const balance = await getBalance(address);
    const messageId = await transferFunds(address, address, seed, balance, true);
    return messageId;
  } catch (error) {
    console.error('combineOutputs error', error);
    throw Error('combineOutputs error');
  }
};

/**
 * Transfer default balance from iota wallet to address
 * @param receiveAddress
 * @returns messageId
 */
const faucet = async (receiveAddress): Promise<BalanceOnlyWallet> => {
  const { seed, defaultBalance, address } = await getIotaWallet();
  const userBalance = await getBalance(receiveAddress);
  const messageId = await transferFunds(receiveAddress, address, seed, defaultBalance, false);
  await waitForLedgerInclusion([messageId]);
  return {
    messageId,
    wallet: {
      balance: userBalance + defaultBalance
    }
  };
};

/**
 * Creates a new wallet with default balance
 * @returns Initialized Wallet with seed, address and default balance
 */
const initWallet = async (): Promise<InitializedWallet> => {
  const receiveSeed = generateSeed();
  const receiveAddress = await generateAddress(receiveSeed);
  const { address, defaultBalance, seed } = await getIotaWallet();
  const { dustProtectionThreshold } = await getSettings();
  const tokens = defaultBalance + dustProtectionThreshold;
  const messageId = await transferFunds(receiveAddress, address, seed, tokens, true);
  const initializedWallet = {
    messageId,
    wallet: {
      address: receiveAddress,
      seed: receiveSeed,
      balance: tokens
    }
  };
  return initializedWallet;
};

/**
 * Initializes semarkt wallet similar to initWallet but with the option to declare a desired balance
 * @param receiveAddress address of receiver
 * @param desiredBalance desired balance optional, else default blanace
 * @returns messageId
 */
const initSemarketWallet = async (receiveAddress: string, desiredBalance: number = null): Promise<string> => {
  const { seed, defaultBalance } = await getIotaWallet();
  const address = await generateAddress(seed);

  const balance = desiredBalance ? Number(desiredBalance) : defaultBalance;
  const messageId = await transferFunds(receiveAddress, address, seed, balance, true);
  return messageId;
};

const fundWallet = async (address: string, seed: string): Promise<BalanceOnlyWallet> => {
  try {
    const filledWallet = await faucet(address);
    const messageId = await combineOutputs(address, seed);
    await waitForLedgerInclusion([messageId]);
    return filledWallet;
  } catch (error) {
    console.error('Could not fundWallet', error);
    throw new Error('Could not fundWallet');
  }
};

/**
 * Transfers funds from a user to a devices address
 * @param userId sender of tokens
 * @param deviceId deviceId of the receiver device
 * @param deviceAddress receiver of tokens (device)
 * @param tokens amount of tokens to transfer
 * @returns messageId
 */
const purchaseData = async (
  userId: string,
  deviceId: string,
  deviceAddress: string,
  tokens: number
): Promise<string> => {
  const { address: userAddress, seed: userSeed } = await getUserWallet(userId);
  const { seed: deviceSeed } = await getSk(deviceId);
  const messageId1 = await transferFunds(deviceAddress, userAddress, userSeed, tokens, false);
  // Wait for transferFunds message to be included to combine new outputs afterwards
  await waitForLedgerInclusion([messageId1]);
  const messageId2 = await combineOutputs(deviceAddress, deviceSeed);
  const messageId3 = await combineOutputs(userAddress, userSeed);
  await waitForLedgerInclusion([messageId2, messageId3]);
  return messageId1;
};

/**
 * Waits for messages to be included in the ledger
 * @param messageIds of messages to be included
 */
const waitForLedgerInclusion = async (messageIds: string[]): Promise<void> => {
  const client = await getClient();
  return new Promise(async (resolve, reject) => {
    const topics = [];
    messageIds.forEach((messageId) => {
      topics.push(`messages/${messageId}/metadata`);
    });
    try {
      await subscribeToMqttTopics(topics);
      resolve();
    } catch (error) {
      console.error('waitForLedgerInclusion error', error);
      reject();
    }
  });
};

/**
 * Subscribes to ledger inclusion updates for specified messages via mqtt
 * @param topics to subscribe to
 */
const subscribeToMqttTopics = async (topics: string[]): Promise<void> => {
  let includedMessages = 0;
  const client = await getClient();
  return new Promise((resolve, reject) => {
    try {
      client
        .subscriber()
        .topics(topics)
        .subscribe(async (error, data) => {
          const topic = data?.topic;
          const payload = JSON.parse(data?.payload);
          if (payload.ledgerInclusionState === 'conflicting' || error) {
            console.error('subscribeToMqttTopics error', { payload, error });
            reject();
          }
          if (payload.ledgerInclusionState === 'included') {
            await unsubscribeToMqttTopics(topic);
            includedMessages++;
          }
          if (includedMessages === topics.length) {
            resolve();
          }
        });
    } catch (error) {
      console.error('Could not subscribe to MQTT topic ', error);
    }
  });
};

/**
 * Unsubscribes to ledger inclusion updates for specified messages via mqtt
 * @param topic to unsubscribe to
 */
const unsubscribeToMqttTopics = async (topic: string): Promise<void> => {
  const client = await getClient();
  return new Promise((resolve, reject) => {
    try {
      client
        .subscriber()
        .topics([topic])
        .unsubscribe((error, _data) => {
          if (error !== null) {
            console.error('unsubscribeToMqttTopics error', error);
            reject();
          }
          resolve();
        });
    } catch (error) {
      console.error('Could not unsubscribe from MQTT topic ', error);
    }
  });
};

const checkRecaptcha = async (captcha, emailSettings) => {
  const response = await axios({
    method: 'post',
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${emailSettings.googleSecretKey}&response=${captcha}`
  });
  return response ? response.data : null;
};

const gpsToAddress = async (latitude, longitude) => {
  try {
    const apiKey = await getGoogleMapsApiKey();
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json; charset=UTF-8' },
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    };
    const result = await axios(options);
    return result.data.results[0].formatted_address;
  } catch (error) {
    console.error('iacToAddress error:', error);
  }
  return null;
};

const iacToAddress = async (iac) => {
  try {
    const { latitude, longitude } = iotaAreaCodes.decode(iac);
    return await gpsToAddress(latitude, longitude);
  } catch (error) {
    console.error('iacToAddress error:', error);
  }
  return null;
};

const gpsToIac = async (latitude, longitude) => {
  try {
    return iotaAreaCodes.encode(latitude, longitude);
  } catch (error) {
    console.error('gpsToIac error:', error);
  }
  return null;
};

const addressToIac = async (address) => {
  try {
    const apiKey = await getGoogleMapsApiKey();
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json; charset=UTF-8' },
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    };
    const result = await axios(options);
    const { lat, lng } = result.data.results[0].geometry.location;
    return iotaAreaCodes.encode(lat, lng);
  } catch (error) {
    console.error('addressToIac error:', error);
  }
  return null;
};

export {
  generateUUID,
  generateAddress,
  generateSeed,
  sanatiseObject,
  initWallet,
  faucet,
  purchaseData,
  checkRecaptcha,
  iacToAddress,
  gpsToAddress,
  addressToIac,
  gpsToIac,
  initSemarketWallet,
  getBalance,
  transferFunds,
  combineOutputs,
  fundWallet
};
