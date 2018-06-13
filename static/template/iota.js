const crypto = require('crypto')
const Mam = require('mam.client.js')
const IOTA = require('iota.lib.js')
const { provider } = require('./config.json')

const iota = new IOTA({ provider })

// Random Key Generator
const keyGen = length => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
  const values = crypto.randomBytes(length)
  return Array.from(new Array(length), (x, i) => charset[values[i] % charset.length]).join('')
}

// Initialise MAM State
let mamState = Mam.init(iota)

// Publish to tangle
const publish = async (packet, callback) => {
  // Change MAM key on each loop
  let mamKey = keyGen(81) // Set initial key
  // Set channel mode & update key
  mamState = Mam.changeMode(mamState, 'restricted', mamKey)
  // Create Trytes
  const trytes = iota.utils.toTrytes(JSON.stringify(packet))
  // Get MAM payload
  const message = Mam.create(mamState, trytes)
  // Save new mamState
  mamState = message.state
  // Attach the payload.
  await Mam.attach(message.payload, message.address)
  console.log('Attached Message', message.state, ' address:', message.address)

  const callbackResponse = await callback(message.root, mamKey)
  console.log(callbackResponse)
}

module.exports = {
  publish,
}
