export var fbRef = {}

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
  fbRef = firebase
  return firebase
}

export const Auth = provider => {
  firebase
    .auth()
    .signInAnonymously()
    // .then(data => {
    //   console.log(data.id)
    //   var ref = firebase
    //     .firestore()
    //     .collection('users')
    //     .doc(data.id)

    //   ref.get().then(data => {
    //     if (!data.exists) return
    //     ref.set({ init: true })
    //   })
    // })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      return errorMessage
    })

  return user
}
