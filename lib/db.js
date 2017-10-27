export default async () => {
  const firebase = await require('firebase')
  require('firebase/firestore')
  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyDeP6zSn-sZWmKecyh5umpj6C1FMGwvYKo',
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
  var user = await userAuth(firebase)
  var firestore = firebase.firestore()
  return { user, firestore }
  //   return user
}

export const userAuth = async firebase => {
  var user = await firebase
    .auth()
    .signInAnonymously()
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      return errorMessage
    })
  return user
}

/// FUNCS

export const getData = async (deviceRef, userRef, id) => {
  try {
    var device = await getDevice(deviceRef, id)
    var data = await getPackets(userRef, id)
    var packets = await crossRef(data)
    return { device, packets }
  } catch (e) {
    return e
  }
}

const getDevice = (deviceRef, id) => {
  return new Promise((resolve, reject) => {
    deviceRef.get().then(doc => {
      if (doc.exists) {
        resolve(doc.data())
      } else {
        reject('No Device!')
      }
    })
  })
}

const getPackets = (userRef, id) => {
  return new Promise((resolve, reject) => {
    userRef
      .collection('purchases')
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve(doc.data())
        } else {
          reject('No packets purchased')
        }
      })
  })
}

const crossRef = data => {
  return new Promise((resolve, reject) => {
    var packets = []
    data.packets.map(ref =>
      ref.get().then(item => {
        if (item.exists) {
          packets.push(item.data())
          if (packets.length === data.packets.length) resolve(packets)
        } else {
          packets.push([])
          if (packets.length === data.packets.length) resolve(packets)
        }
      })
    )
  })
}
