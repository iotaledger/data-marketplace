# Introduction

Welcome to the API documentation for the IOTA Data Marketplace. This provides you with the means to interact with the Marketplace programmatically. All interactions with this API will also effect the user interface, including your stream purchases and the devices you created/delete.

The API exists for two purposes:

1. For users who want to **consume** data streams from devices on the Marketplace
2. For users that want to **manage** their devices on the Marketplace

To get started with the Marketplace API you will need to authenticate yourself with a Google account and get an API key from the website.

# Authentication

> These are an example of the keys required to use the API:

```json
{
  "apiKey": "422c17ca-3f4d-4b6a-be50-51607fe0a324",
  "id": "iEG6V9x70oPOMH7PHXfZlpx4VtG2"
}
```

In order to use the API you will need to get your API key and User ID from the Data Marketplace [user dashboard](https://data.iota.org/#/dashboard). The dashboard provides a graphical interface for the API in case you aren't comfortable with using this API.

### API key

With this key you will be able to administer the devices you own and access the API for general use.

### User ID

You will also need your `id` in order to attribute purchases to your self.

# Consuming data

## Get All Devices

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/devices');
  const json = await response.json();

  console.log(json);
}

sendRequest();
```



> The above command returns JSON structured like this:

```json
[
  {
    "sensorId": "Hello",
    "type": "Weather Station",
    "value": "82913",
    "location": {
      "country": "Australia",
      "city": "Dianella"
    },
    "lon": "52.442",
    "lat": "-12.32",
    "dataTypes": [
      {
        "id": "temp",
        "unit": "c",
        "name": "Temperature"
      },
      {
        "name": "Humidity",
        "id": "hum",
        "unit": "hpa"
      }
    ],
    "owner": "OtvxJHA2c5gNvqtwkOA767QrAnE3",
    "address": "ZXYZZULDJWZTKFNNPAGIYQCVLCMLGTQEXJYBLEUOLJMLF9MY"
  },
  {...}
]
```

This endpoint retrieves all devices.

### HTTP Request

`GET https://api.marketplace.tangle.works/devices`


## Create and Fund Wallet

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/wallet',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'xlXMajjxTleDwmeIEG9SHddlCM02',
      })
    });
  const json = await response.json();
  console.log(json);
}

sendRequest();
```



> The above command returns JSON structured like this:

```json
{
    "success" : true
}
```

This endpoint creates a new wallet and funds it with free IOTA tokens. Please note that Devnet tokens can not be used on the Mainnet or exchanged on any Cryptocurrency exchange platform.

### HTTP Request

`POST https://api.marketplace.tangle.works/wallet`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId     | true     | Your user ID                             |


## Get User

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/user?userId=xlXMajjxTleDwIEG9SHddlCM02');
  const json = await response.json();
  console.log(json);
}

sendRequest();
```



> The above command returns JSON structured like this:

```json
{
   "wallet":{
      "seed":"WSNPJGVBXVGCUDYIEXRHTJGZXHHEYDHQRTVMZJKSBEBDPMHPQPIFFEOSBMI9SMWQVVFUXTPFOR9IDMLZG",
      "balance":1000000,
      "address":"IKBQMFJEJGJYAYMWGUKNREZCLKXMQTQNDXLTQXJATUMWOWDVKRVSLSM9TOYNDJMANM9NCELYCFFDGMMMDOXVS9YURD",
      "keyIndex":0
   }
}
```

This endpoint returns data of a given user

### HTTP Request

`GET https://api.marketplace.tangle.works/user`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId     | true     | Your user ID                             |


## Query Stream

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/stream?deviceId=star-wars-test&userId=xlXMajjxTleDwmeIEG9SHddlCM02&time=null');
  const json = await response.json();
  console.log(json);
}

sendRequest();
```

> If the device stream was not purchased, the above command returns JSON structured like this:

```json
{
    "success": false
}
```

> If the device stream was already purchased, the above command returns JSON structured like this:

```json
[
    {
       "time":1550057296806,
       "root":"XXNHWURJOQIYSTAQVBDBVQILNCJQQORZEIWGSSWDXMWQANZWCQLXIEOGICPP9DXVR9KGSZ9MJEGEHFUIX",
       "sidekey":"GZ9FKCYWQTBKYSNNM9SZNLLLCMRCCXZPHBIFIXUNCBYSWTLGZUSNAYRXTWXGXTNHKKSWFXSN9LMP9AOVK"
    },
    {
       "time":1550053854946,
       "root":"LNYSJXWON9OXFSXSVBK9XGJZRLFQVDKGYBOKVJQYOD9CRSVMOXMDAEDPXBNTKMMQJGQKSYSQDM9TXGPU9",
       "sidekey":"MGZHCGKQIINYSGYPWPKPXJTQOAETGDXJWLPKKARZIHUFDYQOFVYVOUMZC99YEMPBNCXSEDPYLLUFD9ZFR"
    },
    { ... }
]
```

This endpoint queries a purchased stream.

This request returns an array of JSON objects, which contain information like MAM stream root and encryption key. This information is used to retrieve data from IOTA Tangle.

The data is retrieved in chunks. To retrieve the next chunk of data, determine the earliest (smallest) value of the time attribute from the response, and send this value as time parameter with the next request

`https://api.marketplace.tangle.works/stream?deviceId=star-wars-test&userId=xlXMajjxTleDwmeIEG9SHddlCM02&time=1550053854946`


### HTTP Request

`GET https://api.marketplace.tangle.works/stream`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId     | true     | Your user ID                             |
| deviceId   | true     | The ID of the device's stream you'd like access to. |
| time       | false    | Timestamp of the first data package. Default is `null` |



## Purchase Stream

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/purchaseStream',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: '76D1ppAqXNOYPDCsEm9tAj5rPhG3',
        deviceId: 'star-wars'
      })
    });
  const json = await response.json();
  console.log(json);
}

sendRequest();
```

> The above command returns JSON structured like this:

```json
{
    "success" : true
}
```

This endpoint purchases access for a user.

### HTTP Request

`POST https://api.marketplace.tangle.works/purchaseStream`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId     | true     | Your user ID                             |
| device     | true     | The ID of the device's stream you'd like access to. |


# Managing Devices

## Create New Device

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/newDevice',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: 'aaaaaaa-0b7a-4e44-7777-ef661777b9d2',
        id: 'star-wars-test',
        device: {
          owner: 'R7zlZYlhSGKDJ5KKZrw6sJ4CQvG2',
          sensorId: 'star-wars',
          type: 'Star Wars Vehicle',
          company: 'Galactic Empire Inc.',
          price: '100',
          date: '14 February, 2019 11:16 am',
          inactive: true,
          dataTypes: [
            { id: 'name', name: 'Vehicle Name', unit: 'name' },
            { id: 'model', name: 'Vehicle Model', unit: 'model' },
            { id: 'class', name: 'Vehicle Class', unit: 'class' },
            { id: 'manufacturer', name: 'Vehicle Manufacturer', unit: 'manufacturer' }
          ],
          location:{
            city: 'Theed',
            country: 'Naboo'
          },
          lat: 40,
          lon: 20
        }
      })
    });
  const json = await response.json();
  console.log(json);
}

sendRequest();
```

> The above command returns JSON structured like this:

```json
{
    "success" : true
}
```

This endpoint creates a new device for a given user.

### HTTP Request

`POST https://api.marketplace.tangle.works/newDevice`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| apiKey     | true     | Your API Key                             |
| id         | true     | The proposed ID of your device           |
| device     | true     | A fully formed `device` object           |

## Publish Data Packet

```javascript
const fetch = require('node-fetch');
const crypto = require('crypto');
const Mam = require('@iota/mam');
const { asciiToTrytes } = require('@iota/converter');

// Initialise MAM State
let mamState = Mam.init('https://testnet140.tangle.works'); // IOTA Node

// Random Key Generator
const generateRandomKey = length => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  const values = crypto.randomBytes(length);
  return Array.from(new Array(length), (x, i) => charset[values[i] % charset.length]).join('');
};

// Publish to Tangle
const publishData = async payload => {
  const time = Date.now();
  const packet = { time, data: { ...payload } };

  // Change MAM encryption key on each loop
  let mamKey = generateRandomKey(81);

  // Set channel mode & update key
  mamState = Mam.changeMode(mamState, 'restricted', mamKey);

  // Create Trytes
  const trytes = asciiToTrytes(JSON.stringify(packet));

  // Get MAM payload
  const message = Mam.create(mamState, trytes);

  // Save new mamState
  mamState = message.state;

  // Attach the payload.
  await Mam.attach(message.payload, message.address);

  // Store encryption key in Firebase
  await storeKey({ sidekey: mamKey, root: message.root, time });
};

const storeKey = async packet => {
  const response = await fetch('https://api.marketplace.tangle.works/newData',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'star-wars-test',
        sk: 'IGLDKSJSJGKFXA',  // secret key of your device
        packet
      })
    });
  const json = await response.json();
  console.log(json);
}

publishData({ message: 'my test payload' })
```

> The above command returns JSON structured like this:

```json
{
    "success" : true
}
```

This endpoint publishes new MAM event for a given device.

### HTTP Request

`POST https://api.marketplace.tangle.works/newData`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| device     | true     | The ID of the device's stream you are publishing to. |
| sk         | true     | Device's secret key (sk)                 |
| packet     | true     | A fully formed packet including time (`timestamp`) and "restricted" mode MAM `root` and  `sidekey` |


## Get User Devices

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/devices?userId=xlXMajjxTleDwIEG9SHddlCM02&apiKey=1111-gfgfdfg-46467-dsbhsjs-jgu');
  const json = await response.json();

  console.log(json);
}

sendRequest();
```

> The above command returns JSON structured like this:

```json
[
   {
      "lon":20,
      "location":{
         "city":"Theed",
         "country":"Naboo"
      },
      "company":"Galactic Empire Inc.",
      "type":"Star Wars Vehicle",
      "date":"13 February, 2019 11:16 am ",
      "price":"100",
      "timestamp":1550053001462,
      "lat":40,
      "sensorId":"star-wars",
      "address":"YTGYEHBMEYPLIROTWBTLVZPOLJLXHNF9RXUPBGHSWGISAVIVEX9EHBMDVYYI9UEZ9UQJBCMXFGXNUKIWW",
      "inactive":true,
      "owner":"76D1ppAqXNOYPDCsEm9tAj5rPhG3",
      "dataTypes":[
         {
            "id":"name",
            "unit":"name",
            "name":"Vehicle Name"
         },
         {
            "name":"Vehicle Model",
            "id":"model",
            "unit":"model"
         },
         {
            "name":"Vehicle Class",
            "id":"class",
            "unit":"class"
         },
         {
            "id":"manufacturer",
            "unit":"manufacturer",
            "name":"Vehicle Manufacturer"
         }
      ],
      "sk":"IHOHDLGKDLSJJXA"
   },
   { ... }
]
```

This endpoint returns all devices created by given used.

### HTTP Request

`GET https://api.marketplace.tangle.works/devices`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId     | true     | Your user ID                             |
| apiKey     | true     | Your API key                             |


## Remove Device

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/delete',
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: 'aaaaaaa-0b7a-4e44-7777-ef661777b9d2',
        deviceId: 'star-wars-test',
      })
    });
  const json = await response.json();
  console.log(json);
}

sendRequest();
```

> The above command returns JSON structured like this:

```json
{
    "success" : true
}
```

This endpoint removes a device from the database.

### HTTP Request

`DELETE https://api.marketplace.tangle.works/delete`

### Query Parameters

| Parameters | Required | Description                                         |
| ---------- | -------- | --------------------------------------------------- |
| apiKey     | true     | Your API key                                        |
| deviceId   | true     | The ID of the device's stream you'd like access to. |
