import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from '../config.json';

export var fbRef = {};

export const initializeFirebaseApp = () => {
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
};

export default async () => {
  fbRef = firebase;
  return firebase;
};
