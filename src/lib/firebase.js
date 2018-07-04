import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export var fbRef = {}

export default async () => {
  try {
    firebase.initializeApp({
      apiKey: `${process.env.APIKEY}`,
      authDomain: `${process.env.FIREBASEID}.firebaseapp.com`,
      databaseURL: `https://${process.env.FIREBASEID}.firebaseio.com`,
      projectId: `${process.env.FIREBASEID}`
    })

    const firestore = firebase.firestore()
    const settings = { timestampsInSnapshots: true }
    firestore.settings(settings)
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }
  fbRef = firebase
  return firebase
}
