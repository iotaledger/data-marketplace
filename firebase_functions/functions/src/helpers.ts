import * as crypto from 'crypto';
const axios = require('axios');
import { v4 as uuidv4 } from 'uuid';

import { Client, ClientBuilder } from '@iota/client';
import { MessageMetadata } from '@iota/client/lib/types';
const iotaAreaCodes = require('@iota/area-codes');

const {
  getSettings,
  getIotaWallet,
  getUserWallet,
  getGoogleMapsApiKey,
} = require('./firebase');

/**
 * Initializes client with devnet node
 * @returns Client: https://client-lib.docs.iota.org/libraries/nodejs/api_reference.html#clientbuilder
 */
const getClient = async (): Promise<Client> => {
  const settings = await getSettings();
  const client = new ClientBuilder()
    .node(settings.provider)
    .localPow(false)
    .build();
  return client
}

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
  const client = await getClient()
  const addresses = await client.getAddresses(seed)
    .accountIndex(accountIndex)
    .range(0, 1)
    .get()
  // safe assertion since includeInternal() is not used and thus addresses is a string[]
  const address = addresses[0] as string
  return address
}

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
  if (!device.location || !device.location.city || !device.location.country)
    return 'Enter city or country';
  if (!device.lat || !device.lon) return 'Please enter a device coordinates';
  if (!device.dataTypes || device.dataTypes.length < 1) return 'You must have a valid data fields';
  if (!device.owner) return 'You must specify an owner';
  return false;
};

/**
 * Find message on tangle by messageId
 * @param messageId of the message to find
 * @returns message_metadata: https://client-lib.docs.iota.org/libraries/nodejs/api_reference.html#messagemetadata
 */
const findMessage = async (messageId: string): Promise<MessageMetadata> => {
  const client = await getClient();
  const message_metadata = await client.getMessage().metadata(messageId)
  return message_metadata
};

/**
 * Transfers token from one address to another address
 * @param receiveAddress address of token receiver
 * @param address address of token sender
 * @param seed seed of the sender
 * @param tokens amount of tokens to transfer
 * @returns messageId
 */
const transferFunds = async (receiveAddress: string, address: string, seed: string, tokens: number): Promise<string> | null => {
  const client = await getClient();
  const { balance } = await client.getAddressBalance(address)

  if (balance < tokens) {
    console.error('transferFunds. Insufficient balance', address, balance);
    throw Error(`transferFunds. Insufficient balance on address: ${address}`)
  }
  try {
    const message = await client.message()
      .seed(seed)
      .output(receiveAddress, tokens)
      .submit()
    const messageId = message.messageId
    return messageId
  } catch (e) {
    if (e.message.includes("DustError")) {
      throw Error(`No dust output allowed on address ${receiveAddress}`)
    }
    console.error('Could not transfer funds: ', e)
    throw Error('Could not transfer funds')
  }
}

/**
 * Transfer default balance from iota wallet to address
 * @param receiveAddress 
 * @returns messageId
 */
const faucet = async (receiveAddress): Promise<string> => {
  const { seed, defaultBalance } = await getIotaWallet();
  const address = await generateAddress(seed);

  const messageId = await transferFunds(
    receiveAddress,
    address,
    seed,
    defaultBalance
  );
  return messageId;
};

type InitializedWallet = { "messageId": string, "wallet": { address: string, seed: string, balance: number } }

/**
 * Creates a new wallet with default balance 
 * @returns Initialized Wallet with seed, address and default balance 
 */
const initWallet = async (): Promise<InitializedWallet> => {
  const receiveSeed = generateSeed();
  const receiveAddress = await generateAddress(receiveSeed);
  const { address, defaultBalance, seed } = await getIotaWallet();

  //debug
  console.log({
    receiveAddress,
    address,
    seed,
    defaultBalance
  });
  const messageId = await transferFunds(
    receiveAddress,
    address,
    seed,
    defaultBalance
  );
  const initializedWallet = {
    messageId,
    wallet: {
      address: receiveAddress,
      seed: receiveSeed,
      balance: defaultBalance,
    }
  };
  return initializedWallet
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
  const messageId = await transferFunds(
    receiveAddress,
    address,
    seed,
    balance
  );
  return messageId;
};

/**
 * Transfers funds from a user to a devices address
 * @param userId sender of tokens
 * @param receiveAddress receiver of tokens (device)
 * @param tokens amount of tokens to transfer
 * @returns messageId
 */
const purchaseData = async (userId, receiveAddress, tokens): Promise<string> => {
  const { seed } = await getUserWallet(userId);
  console.log(seed)
  const address = await generateAddress(seed);

  const messageId = await transferFunds(
    receiveAddress,
    address,
    seed,
    tokens
  );
  return messageId;
};

const checkRecaptcha = async (captcha, emailSettings) => {
  const response = await axios({
    method: 'post',
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${emailSettings.googleSecretKey}&response=${captcha}`,
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
    console.log('iacToAddress error:', error);
  }
  return null;
}

const iacToAddress = async iac => {
  try {
    const { latitude, longitude } = iotaAreaCodes.decode(iac);
    return await gpsToAddress(latitude, longitude);
  } catch (error) {
    console.log('iacToAddress error:', error);
  }
  return null;
}

const gpsToIac = async (latitude, longitude) => {
  try {
    return iotaAreaCodes.encode(latitude, longitude);
  } catch (error) {
    console.error('gpsToIac error:', error);
  }
  return null;
}

const addressToIac = async address => {
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
}

export {
  generateUUID,
  generateAddress,
  generateSeed,
  sanatiseObject,
  findMessage,
  initWallet,
  faucet,
  purchaseData,
  checkRecaptcha,
  iacToAddress,
  gpsToAddress,
  addressToIac,
  gpsToIac,
  initSemarketWallet
}