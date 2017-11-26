export default async () => {
  const firebase = await require('firebase')
  require('firebase/firestore')
  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyAc6Kq52Slk9m16nRog8hWA4NkFgBIDUo4',
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
export const deviceInfo = async (deviceRef, id) => {
  try {
    return await getDevice(deviceRef, id)
  } catch (e) {
    return e
  }
}

export const getData = async (deviceRef, userRef, id) => {
  try {
    var data = await getPackets(userRef, id)
    var packets = await crossRef(data, deviceRef)
    return packets
  } catch (e) {
    return e
  }
}
export const allDevices = ref => {
  return new Promise((resolve, reject) => {
    ref
      .collection('devices')
      .get()
      .then(function(querySnapshot) {
        var devices = []
        querySnapshot.forEach(function(doc) {
          devices.push(doc.data())
        })
        resolve(devices)
      })
  })
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

export const crossRef = (data, deviceRef) => {
  if (data.full) {
    return new Promise((resolve, reject) => {
      deviceRef
        .collection('data')
        .get()
        .then(querySnapshot => {
          var data = []
          // Resolve if empty
          if (querySnapshot.empty) reject()
          querySnapshot.forEach(function(doc) {
            data.push(doc.data())
          })
          resolve(data)
        })
    })
  } else {
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
}