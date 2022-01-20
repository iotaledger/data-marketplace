import { Client, ClientBuilder } from '@iota/client';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto';
import { getIotaWallet, getSettings } from './firebase';
import { transferFunds } from './helpers';

export const migration = async (from: number, to: number) => {
  await deleteUnusedDevices(from, to);
  await deleteUnusedUsers(from, to);
  await updateDevices(from, to);
  await updateUser(from, to);
  await fundDevices(from, to);
};

const fundDevices = async (from: number, to: number) => {
  const { address, defaultBalance, seed } = await getIotaWallet();
  const { dustProtectionThreshold } = await getSettings();
  const tokens = defaultBalance + dustProtectionThreshold;
  const deviceRef = admin.firestore().collection('devices');
  await deviceRef.get().then(async (querySnapshot) => {
    const docs = querySnapshot.docs;
    console.log('Docs length: ', docs.length);
    for (let docIndex = from; docIndex < to; docIndex++) {
      console.log(`${docIndex}/${to}`);
      const device = docs[docIndex];
      const deviceAddress = device.data().address;
      console.log('Device address: ', deviceAddress);
      const messageId = await transferFunds(deviceAddress, address, seed, tokens, true);
      console.log(messageId);
    }
  });
};

const deleteUnusedDevices = async (from: number, to: number) => {
  const deviceRef = admin.firestore().collection('devices');
  await deviceRef.get().then(async (querySnapshot) => {
    const docs = querySnapshot.docs;
    console.log('Docs length: ', docs.length);
    for (let docIndex = from; docIndex < to; docIndex++) {
      const device = docs[docIndex];
      console.log('Device: ', device.id);
      const data = await admin.firestore().collection('devices').doc(device.id).collection('data').limit(1).get();
      if (data.size === 0) {
        console.log('------> Deleting device: ', device.id);
        await admin.firestore().collection('devices').doc(device.id).delete();
        await admin.firestore().collection('deviceList').doc(device.id).delete();
      }
    }
  });
};

const deleteUnusedUsers = async (from: number, to: number) => {
  const userRef = admin.firestore().collection('users');
  await userRef.get().then(async (querySnapshot) => {
    const docs = querySnapshot.docs;
    console.log('Docs length: ', docs.length);
    for (let docIndex = from; docIndex < to; docIndex++) {
      const user = docs[docIndex];
      if (!user) {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', docIndex);
        continue;
      }
      console.log('User: ', user?.id);
      const data = await admin.firestore().collection('users').doc(user.id).collection('purchases').limit(1).get();
      if (data.size === 0) {
        console.log('------> Deleting user: ', user.id);
        await admin.firestore().collection('users').doc(user.id).delete();
      }
    }
  });
};

const updateDevices = async (from: number, to: number) => {
  const deviceListRef = admin.firestore().collection('deviceList');
  const deviceRef = admin.firestore().collection('devices');

  await deviceListRef.get().then(async (querySnapshot) => {
    const docs = querySnapshot.docs;
    for (let docIndex = from; docIndex < to; docIndex++) {
      console.log(`Updating doc ${docIndex}/${docs.length}`);
      const deviceListDoc = docs[docIndex];
      const seed = generateSeed();
      const address = await generateAddress(seed);
      console.log(`Doc: ${deviceListDoc.id}, Seed: ${seed}, Address: ${address}`);
      const batch = admin.firestore().batch();
      batch.update(deviceListDoc.ref, { seed });
      batch.update(deviceRef.doc(deviceListDoc.id), { address, inactive: false });
      await batch.commit();
      const dataRef = deviceRef.doc(deviceListDoc.id).collection('data');
      await deleteCollection(admin.firestore(), dataRef, 300);
    }
  });
};

const updateUser = async (from: number, to: number) => {
  const userListRef = admin.firestore().collection('users');

  await userListRef.get().then(async (querySnapshot) => {
    const docs = querySnapshot.docs;
    for (let docIndex = from; docIndex < to; docIndex++) {
      const userDoc = docs[docIndex];
      const data = userDoc.data();
      console.log(`Doc ${docIndex}/${docs.length}`);
      if (data.wallet) {
        const seed = generateSeed();
        const address = await generateAddress(seed);
        const wallet = {
          seed,
          address,
          balance: 0
        };
        console.log(`Replacing: ${JSON.stringify(data.wallet, null, 2)} with ${JSON.stringify(wallet, null, 2)}`);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        await userListRef.doc(userDoc.id).update({
          wallet
        });
      }
    }
  });
};

async function deleteCollection(db, collectionRef, batchSize) {
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  console.log('Batchsize: ', batchSize);
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

let client;
const getClient = async (): Promise<Client> => {
  if (client) return client;
  const settings = await getSettings()
  client = new ClientBuilder().node(settings.provider).localPow(false).build();
  return client;
};

const generateSeed = (): string => {
  return crypto.createHash('sha256').update(crypto.randomBytes(256)).digest('hex');
};

const generateAddress = async (seed: string, accountIndex = 0): Promise<string> => {
  const client = await getClient();
  const addresses = await client.getAddresses(seed).accountIndex(accountIndex).range(0, 1).get();
  // safe assertion since includeInternal() is not used and thus addresses is a string[]
  const address = addresses[0] as string;
  return address;
};
