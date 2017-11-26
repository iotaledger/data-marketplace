var admin = require('firebase-admin')
var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://marketplacev2.firebaseio.com'
})

const db = admin.firestore()

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

module.exports = {
  db: db,
  full: full,
  newDevice: newDevice,
  newData: newData
}
