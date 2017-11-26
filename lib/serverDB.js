var admin = require('firebase-admin')
var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://marketplacev2.firebaseio.com'
})

const db = admin.firestore()

// Maintain a list of device keys.
let deviceKeys = []
db.collection('deviceList').onSnapshot(function(snap) {
  snap.forEach(function(doc) {
    deviceKeys[doc.id] = doc.data().sk
  })
})

const full = (id, device) => {
  return new Promise((resolve, reject) => {
    var docRef = db
      .collection('users')
      .doc(id)
      .collection('purchases')
      .doc(device)
      .set({
        full: true,
        time: Date.now()
      })
      .then(data => {
        console.log(data)
        resolve(data)
      })
  })
}

const newDevice = (id, device, sk) => {
  return new Promise((resolve, reject) => {
    console.log(id, device)
    // Add device key into the list
    db
      .collection('deviceList')
      .doc(id)
      .set({ sk })
    // Add public device record
    db
      .collection('devices')
      .doc(id)
      .set(device)
      .then(data => {
        console.log(data)
        resolve(data)
      })
  })
}

const newData = (id, packet, sk) => {
  if (deviceKeys[id] !== sk) return { error: 'Oh noes, your key is incorrect.' }
  return new Promise((resolve, reject) => {
    db
      .collection('devices')
      .doc(id)
      .collection('data')
      .doc()
      .set(packet)
      .then(response => {
        console.log(response)
        resolve(response)
      })
  })
}

module.exports = {
  db: db,
  full: full,
  newDevice: newDevice,
  newData: newData
}
