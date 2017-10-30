var admin = require('firebase-admin')
var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://datamarket-617e1.firebaseio.com'
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

module.exports = {
  db: db,
  full: full
}
