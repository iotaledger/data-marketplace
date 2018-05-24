export const userAuth = async firebase => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // User is signed in.
        resolve(user)
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .then(data => {
            console.log(data.id)
            resolve(data)
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            return errorMessage
          })
      }
    })
  })
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
export const allDevices = firebase => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
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
