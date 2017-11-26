import IOTA from 'iota.lib.js'
const node = `https://testnet140.tangle.works/`
export const iota = new IOTA({ provider: node })
require('isomorphic-fetch')

export const initWallet = async () => {
  var response = await fetch('https://seeedy.tangle.works/')
  return await response.json()
}

export const purchaseData = async (seed, address, value) => {
  try {
    curl.init()
    curl.overrideAttachToTangle(iota)
  } catch (e) {
    console.log('Falling Back')
  }

  var transfers = [{ address, value }]
  return new Promise(function(resolve, reject) {
    iota.api.sendTransfer(seed, 5, 9, transfers, (e, r) => {
      if (e !== null) {
        reject(e)
      } else {
        resolve(r)
      }
    })
  })
}

export const getBalance = async address => {
  var packet = `{"command": "getBalances", "addresses": ["${
    address
  }"], "threshold": 100}`
  var response = await fetch(node, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-IOTA-API-Version': 1
    },
    body: packet
  })

  let resp = await response.json()
  return resp.balances[0]
}

export const reducer = amount => {
  if (amount < Math.pow(10, 3)) {
    var num = amount
    if (num % 1 != 0) return num.toFixed(2) + 'i'
    return num + 'i'
  } else if (amount < Math.pow(10, 6)) {
    var num = amount / Math.pow(10, 3)
    if (num % 1 != 0) return num.toFixed(2) + 'Ki'
    return num + 'Ki'
  } else if (amount < Math.pow(10, 9)) {
    var num = amount / Math.pow(10, 6)
    if (num % 1 != 0) return num.toFixed(2) + 'Mi'
    return num + 'Mi'
  } else if (amount < Math.pow(10, 12)) {
    var num = amount / Math.pow(10, 9)
    if (num % 1 != 0) return num.toFixed(2) + 'Gi'
    return num + 'Gi'
  } else if (amount < Math.pow(10, 15)) {
    var num = amount / Math.pow(10, 12)
    if (num % 1 != 0) return num.toFixed(2) + 'Ti'
    return num + 'Ti'
  }
}
