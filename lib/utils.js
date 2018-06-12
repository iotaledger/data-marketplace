import IOTA from 'iota.lib.js'
require('isomorphic-fetch')

const node = `https://testnet140.tangle.works/`

export const iota = new IOTA({ provider: node })

export const initWallet = async () => {
    var response = await fetch('https://marketseeds.tangle.works/')
    return await response.json()
}

export const purchaseData = async (seed, address, value) => {
    try {
        curl.init()
        curl.overrideAttachToTangle(iota)
        console.log('Overiding Curl')
    } catch (e) {
        console.log('Falling Back')
    }
    try {
        var transfers = [
            { address: iota.utils.addChecksum(address), value: parseInt(value) }
        ]
    } catch (e) {
        throw Error('Device address is invalid')
    }

    return new Promise(function(resolve, reject) {
        iota.api.sendTransfer(seed, 5, 9, transfers, (e, r) => {
            if (e !== null) {
                console.log(e)
                reject(e)
            } else {
                resolve(r)
            }
        })
    })
}

export const getBalance = async address => {
    var packet = `{"command": "getBalances", "addresses": ["${address.substring(
        0,
        81
    )}"], "threshold": 100}`
    var response
    try {
        response = await fetch(node, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-IOTA-API-Version': 1
            },
            body: packet
        })
    } catch (e) {
        return 0
    }

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

export const generateSeed = length => {
    if (window.crypto && window.crypto.getRandomValues) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
        let result = ''
        let values = new Uint32Array(length)
        window.crypto.getRandomValues(values)
        values.forEach(value => (result += charset[value % charset.length]))
        return result
    } else
        throw new Error(
            "Your browser is outdated and can't generate secure random numbers"
        )
}

export const generateDeviceAddress = (seed, callback) => {
    iota.api.getNewAddress(seed, {}, (error, address) => {
        if (error) throw error
        callback(address)
    })
}
