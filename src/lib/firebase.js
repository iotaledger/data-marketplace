import firebase from 'firebase/app';

export var fbRef = {};

export default async () => {
  fbRef = firebase;
  return firebase;
};
