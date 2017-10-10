export default async () => {
  const firebase = await require("firebase")
  require("firebase/firestore")

  try {
    firebase.initializeApp({
      apiKey: "AIzaSyDeP6zSn-sZWmKecyh5umpj6C1FMGwvYKo",
      authDomain: `https://${process.env.FIREBASEID}.firebaseapp.com`,
      databaseURL: `https://${process.env.FIREBASEID}.firebaseio.com`,
      projectId: process.env.FIREBASEID
    })
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack)
    }
  }
  var user = await userAuth(firebase)
  var firestore = firebase.firestore()
  return { user, firestore }
  //   return user
}

export const userAuth = async firebase => {
  var user = await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          return errorMessage
        })
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
    })
  return user
}
