import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import api from './api';
import config from '../config.json';

export const initializeFirebaseApp = () => {
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
};

export const userAuth = async () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // User is signed in.
        resolve(user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .then(data => {
            if (data.user) {
              resolve(data.user);
            }
            reject(data);
          })
          .catch(error => {
            console.error('userAuth error', error);
            reject(error.message);
            return error.message;
          });
      }
    });
  });
};

export const allDevices = (email = null, page = null) => {
  return new Promise(async (resolve, reject) => {
    const devices = await api('getDevices', { email, page });
    resolve(devices);
  });
};
