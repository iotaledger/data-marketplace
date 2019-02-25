import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import api from './api';
import config from '../config.json';

export const initializeFirebaseApp = () => {
  firebase.initializeApp(config);
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

export const allDevices = () => {
  return new Promise(async (resolve, reject) => {
    const devices = await api.get('devices');
    const devicesWithData = devices.filter(device => device.hasData);
    resolve(devicesWithData);
  });
};
