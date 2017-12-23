export default async () => {
  const firebase = await require('firebase')
  require('firebase/firestore')
  try {
    firebase.initializeApp({
      apiKey: `${process.env.APIKEY}`,
      authDomain: `https://${process.env.FIREBASEID}.firebaseapp.com`,
      databaseURL: `https://${process.env.FIREBASEID}.firebaseio.com`,
      projectId: `${process.env.FIREBASEID}`
    })
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }
  var firestore = firebase.firestore()
  return { firestore }
}
