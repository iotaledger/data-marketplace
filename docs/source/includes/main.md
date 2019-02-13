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
  const response = await fetch('https://api.marketplace.tangle.works/getDevices',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  const json = await response.json();

  console.log(json);
}

sendRequest()
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

`POST https://api.marketplace.tangle.works/getDevices`


## Create and Fund Wallet

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/setWallet',
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

sendRequest()
```



> The above command returns JSON structured like this:

```json
{
   "transactions":[
      {
         "hash":"IIVBQPCACXEVRGEMXH9XBTPYFFDCZSXPVCKBGLVICEHJNFTNVVCO9UAYUIIENLLEOVKGEWIABTKFHN999",
         "signatureMessageFragment":"...",
         "address":"IKBQMFJEJGJYAYMWGUKNREZCLKXMQTQNDXLTQXJATUMWOWDVKRVSLSM9TOYNDJMANM9NCELYCFFDGMMMD",
         "value":1000000,
         "obsoleteTag":"KI9999999999999999999999999",
         "timestamp":1550057627,
         "currentIndex":0,
         "lastIndex":3,
         "bundle":"99LQGEZTBAHJIDPQCSQIGQVHCPOIJSVAKPKOECSERYCXHUGQYFGLIH9XVTOHFHXGVAKUZWZTIXEHFZOVD",
         "trunkTransaction":"MUBMFUWGVRFWNY9RXJMECLRWXZTBIXMOQMNQIV9CLCPX9JWUAAKGKOBQOPIXMSVUCRUYYZDSCZXDXL999",
         "branchTransaction":"YOZJLBKKFFJJRJCLKMIAJ9VRZCRIRFBIQJUAYUGCF9EBF9GICLCNJFWGLDJJGMOHNTGXKOXJZLWWPX999",
         "tag":"KI9999999999999999999999999",
         "attachmentTimestamp":1550057650576,
         "attachmentTimestampLowerBound":0,
         "attachmentTimestampUpperBound":3812798742493,
         "nonce":"QVIWKVBMHAJYBTLTUD9ZRQWFZYQ"
      },
      {
         "hash":"MUBMFUWGVRFWNY9RXJMECLRWXZTBIXMOQMNQIV9CLCPX9JWUAAKGKOBQOPIXMSVUCRUYYZDSCZXDXL999",
         "signatureMessageFragment":"...",
         "address":"AJGVUHMYZUDQPUJFTNXH99JLTWMGVFETQLZCECNOVLXTFCCDKA9WOOWWX9XKGDTXUTSABAQIYBWFDNCHC",
         "value":-8927121620,
         "obsoleteTag":"999999999999999999999999999",
         "timestamp":1550057627,
         "currentIndex":1,
         "lastIndex":3,
         "bundle":"99LQGEZTBAHJIDPQCSQIGQVHCPOIJSVAKPKOECSERYCXHUGQYFGLIH9XVTOHFHXGVAKUZWZTIXEHFZOVD",
         "trunkTransaction":"RAZWKTVJFJVTDQCWEHYOJ9BVIRRTGNZMBSHO9PDYUTZCGAGUDOULEPWVUQBQZYILEMBEWVUYTCQXY9999",
         "branchTransaction":"YOZJLBKKFFJJRJCLKMIAJ9VRZCRIRFBIQJUAYUGCF9EBF9GICLCNJFWGLDJJGMOHNTGXKOXJZLWWPX999",
         "tag":"999999999999999999999999999",
         "attachmentTimestamp":1550057650557,
         "attachmentTimestampLowerBound":0,
         "attachmentTimestampUpperBound":3812798742493,
         "nonce":"VY9YKGNDEZCRDJKPNZMRWNWYEMR"
      },
      {
         "hash":"RAZWKTVJFJVTDQCWEHYOJ9BVIRRTGNZMBSHO9PDYUTZCGAGUDOULEPWVUQBQZYILEMBEWVUYTCQXY9999",
         "signatureMessageFragment":"...",
         "address":"AJGVUHMYZUDQPUJFTNXH99JLTWMGVFETQLZCECNOVLXTFCCDKA9WOOWWX9XKGDTXUTSABAQIYBWFDNCHC",
         "value":0,
         "obsoleteTag":"999999999999999999999999999",
         "timestamp":1550057627,
         "currentIndex":2,
         "lastIndex":3,
         "bundle":"99LQGEZTBAHJIDPQCSQIGQVHCPOIJSVAKPKOECSERYCXHUGQYFGLIH9XVTOHFHXGVAKUZWZTIXEHFZOVD",
         "trunkTransaction":"BYURIACJOEZVSLWALKBSZODA9UYHLWDDVIYHK9XYZQLEASSNGJXIOEVUYWLMZUMOHZDRAHPVQTRKHY999",
         "branchTransaction":"YOZJLBKKFFJJRJCLKMIAJ9VRZCRIRFBIQJUAYUGCF9EBF9GICLCNJFWGLDJJGMOHNTGXKOXJZLWWPX999",
         "tag":"999999999999999999999999999",
         "attachmentTimestamp":1550057650530,
         "attachmentTimestampLowerBound":0,
         "attachmentTimestampUpperBound":3812798742493,
         "nonce":"WWBXWARXTLVXZCMN9QHWGBWUCAU"
      },
      {
         "hash":"BYURIACJOEZVSLWALKBSZODA9UYHLWDDVIYHK9XYZQLEASSNGJXIOEVUYWLMZUMOHZDRAHPVQTRKHY999",
         "signatureMessageFragment":"...",
         "address":"C9IAQENJJGJLGKMTOZOATVDGOHBAQZ9ULFEETQZJYJEETLKBMFCHAMOYGHQVVZNOB9EMWIVMFV9AXYZJB",
         "value":8926121620,
         "obsoleteTag":"999999999999999999999999999",
         "timestamp":1550057627,
         "currentIndex":3,
         "lastIndex":3,
         "bundle":"99LQGEZTBAHJIDPQCSQIGQVHCPOIJSVAKPKOECSERYCXHUGQYFGLIH9XVTOHFHXGVAKUZWZTIXEHFZOVD",
         "trunkTransaction":"YOZJLBKKFFJJRJCLKMIAJ9VRZCRIRFBIQJUAYUGCF9EBF9GICLCNJFWGLDJJGMOHNTGXKOXJZLWWPX999",
         "branchTransaction":"FOWZIZYGMUEIKGKDCKUESRYHLAMXHRCKSRATQEWNIEXYHPQQPWQYCFBZHFJMAEFLG9LKWIMTXEHXNS999",
         "tag":"999999999999999999999999999",
         "attachmentTimestamp":1550057650510,
         "attachmentTimestampLowerBound":0,
         "attachmentTimestampUpperBound":3812798742493,
         "nonce":"FDPCXKGTW9XQTBTRZLEFDWPGVAM"
      }
   ]
}
```

This endpoint creates a new wallet and funds it with free IOTA tokens. Please note that Devnet tokens can not be used on the Mainnet or exchanged on any Cryptocurrency exchange platform.

### HTTP Request

`POST https://api.marketplace.tangle.works/setWallet`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId     | true     | Your user ID                             |


## Get User

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/getUser',
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

sendRequest()
```



> The above command returns JSON structured like this:

```json
{
   "wallet":{
      "seed":"WSNPJGVBXVGCUDYIEXRHTJGZXHHEYDHQRTVMZJKSBEBDPMHPQPIFFEOSBMI9SMWQVVFUXTPFOR9IDMLZG",
      "balance":1000000,
      "address":"IKBQMFJEJGJYAYMWGUKNREZCLKXMQTQNDXLTQXJATUMWOWDVKRVSLSM9TOYNDJMANM9NCELYCFFDGMMMDOXVS9YURD",
      "keyIndex":0
   },
   "numberOfDevices":5
}
```

This endpoint returns data of a given user

### HTTP Request

`POST https://api.marketplace.tangle.works/getUser`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId     | true     | Your user ID                             |


## Query Stream 

```javascript
const fetch = require('node-fetch')

let response = fetch(
    'https://api.marketplace.tangle.works/queryStream', 
  	{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'xlXMajjxTleDwmeIEG9SHddlCM02', // Your User ID
        deviceId: "testing-data", // Device ID
        time: null // to fetch data within specified time period
      })
    }
)
```

> If the device stream was not purchased, the above command returns JSON structured like this:

```json
{
  { "error": "Please purchase the stream" }
}
```

> If the device stream was already purchased, the above command returns JSON structured like this:

```json
{
   "data":[
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
   ],
   "purchase":{
      "time":1550060980713,
      "full":true
   }
}
```

This endpoint queries a purchased stream.

### HTTP Request

`POST https://api.marketplace.tangle.works/queryStream`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId     | true     | Your user ID                            |
| deviceId   | true     | The ID of the device's stream you'd like access to. |


## Purchase Data 

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/purchaseData',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'xlXMajjxTleDwmeIEG9SHddlCM02',
        address: 'YTGYEHBMEYPLIROTWBTLVZPOLJLXHNF9RXUPBGHSWGISAVIVEX9EHBMDVYYI9UEZ9UQJBCMXFGXNUKIWW',
        value: 100,
      })
    });
  const json = await response.json();
  console.log(json);
}

sendRequest()
```

> The above command returns JSON structured like this:

```json
{
   "transactions":[
      {
         "hash":"GIKCTXLVJNGQUCFAMRJNZLYBUMPVPU99RGLVZBMVBGTMU9FLEEW9CXJJO99QWOJBJLCPUNUVVZRURS999",
         "signatureMessageFragment":"...",
         "address":"YTGYEHBMEYPLIROTWBTLVZPOLJLXHNF9RXUPBGHSWGISAVIVEX9EHBMDVYYI9UEZ9UQJBCMXFGXNUKIWW",
         "value":100,
         "obsoleteTag":"WK9999999999999999999999999",
         "timestamp":1550058555,
         "currentIndex":0,
         "lastIndex":3,
         "bundle":"XAHEUVEDKOJBHSGTKOKCBBFH9WBHQOHEZJLIFWWDRCDHFTZJKQDFOIMKWBWX9YKCEKQ9BHRK9YRGCRUHX",
         "trunkTransaction":"KOFITPUXPFWRBCWK9EOUSZOHWDITJAJZZXCFQPPQPRQVNXTMFGZGYTRWWGLUNKDVGODAFQRBBKITEX999",
         "branchTransaction":"HKIFU9EAFLKTDWXJBJQSIHOAXPGPZAOJJBSQWEHQCDCQZPFVGXVS9ETTLUPUSIZETFTBT9EXXOZAAH999",
         "tag":"WK9999999999999999999999999",
         "attachmentTimestamp":1550058577417,
         "attachmentTimestampLowerBound":0,
         "attachmentTimestampUpperBound":3812798742493,
         "nonce":"MXKKKQEAFGUDGMZYHDJ9BPSWHYY"
      },
      {
         "hash":"KOFITPUXPFWRBCWK9EOUSZOHWDITJAJZZXCFQPPQPRQVNXTMFGZGYTRWWGLUNKDVGODAFQRBBKITEX999",
         "signatureMessageFragment":"...",
         "address":"IKBQMFJEJGJYAYMWGUKNREZCLKXMQTQNDXLTQXJATUMWOWDVKRVSLSM9TOYNDJMANM9NCELYCFFDGMMMD",
         "value":-1000000,
         "obsoleteTag":"999999999999999999999999999",
         "timestamp":1550058555,
         "currentIndex":1,
         "lastIndex":3,
         "bundle":"XAHEUVEDKOJBHSGTKOKCBBFH9WBHQOHEZJLIFWWDRCDHFTZJKQDFOIMKWBWX9YKCEKQ9BHRK9YRGCRUHX",
         "trunkTransaction":"HWGKYSQF9HOYAJHRPTVJOMKAWUEMU9JNTT9YEDAGIAAGCXFYGFCWMWGNQUNJTCBBDIMJASWSPIZSAK999",
         "branchTransaction":"HKIFU9EAFLKTDWXJBJQSIHOAXPGPZAOJJBSQWEHQCDCQZPFVGXVS9ETTLUPUSIZETFTBT9EXXOZAAH999",
         "tag":"999999999999999999999999999",
         "attachmentTimestamp":1550058577361,
         "attachmentTimestampLowerBound":0,
         "attachmentTimestampUpperBound":3812798742493,
         "nonce":"IBRIKFQRPC9BEYYYANJFT9HCPBQ"
      },
      {
         "hash":"HWGKYSQF9HOYAJHRPTVJOMKAWUEMU9JNTT9YEDAGIAAGCXFYGFCWMWGNQUNJTCBBDIMJASWSPIZSAK999",
         "signatureMessageFragment":"...",
         "address":"IKBQMFJEJGJYAYMWGUKNREZCLKXMQTQNDXLTQXJATUMWOWDVKRVSLSM9TOYNDJMANM9NCELYCFFDGMMMD",
         "value":0,
         "obsoleteTag":"999999999999999999999999999",
         "timestamp":1550058555,
         "currentIndex":2,
         "lastIndex":3,
         "bundle":"XAHEUVEDKOJBHSGTKOKCBBFH9WBHQOHEZJLIFWWDRCDHFTZJKQDFOIMKWBWX9YKCEKQ9BHRK9YRGCRUHX",
         "trunkTransaction":"IGOVPJMBVMPXFJGFFMYCKGGJJETGIOEKHKRCMFFAFOUFBZFUUUBLMREPJA9DIU9UHQBVGEVTRWVRGN999",
         "branchTransaction":"HKIFU9EAFLKTDWXJBJQSIHOAXPGPZAOJJBSQWEHQCDCQZPFVGXVS9ETTLUPUSIZETFTBT9EXXOZAAH999",
         "tag":"999999999999999999999999999",
         "attachmentTimestamp":1550058577334,
         "attachmentTimestampLowerBound":0,
         "attachmentTimestampUpperBound":3812798742493,
         "nonce":"VXFYTBMAN9FBCHXDNIG9SNLUEGS"
      },
      {
         "hash":"IGOVPJMBVMPXFJGFFMYCKGGJJETGIOEKHKRCMFFAFOUFBZFUUUBLMREPJA9DIU9UHQBVGEVTRWVRGN999",
         "signatureMessageFragment":"...",
         "address":"ZDAWFMULZDXDAIQO9DM9APKOKTMVKBTZQUFSLXNDERFHJPFHLIXGPVYWECMJTFNQPCOWLAJCIOQE9XVVX",
         "value":999900,
         "obsoleteTag":"999999999999999999999999999",
         "timestamp":1550058555,
         "currentIndex":3,
         "lastIndex":3,
         "bundle":"XAHEUVEDKOJBHSGTKOKCBBFH9WBHQOHEZJLIFWWDRCDHFTZJKQDFOIMKWBWX9YKCEKQ9BHRK9YRGCRUHX",
         "trunkTransaction":"HKIFU9EAFLKTDWXJBJQSIHOAXPGPZAOJJBSQWEHQCDCQZPFVGXVS9ETTLUPUSIZETFTBT9EXXOZAAH999",
         "branchTransaction":"HKIFU9EAFLKTDWXJBJQSIHOAXPGPZAOJJBSQWEHQCDCQZPFVGXVS9ETTLUPUSIZETFTBT9EXXOZAAH999",
         "tag":"999999999999999999999999999",
         "attachmentTimestamp":1550058577308,
         "attachmentTimestampLowerBound":0,
         "attachmentTimestampUpperBound":3812798742493,
         "nonce":"QPFRKLKTTRKWZHZGMVC9RMKYNVZ"
      }
   ]
}
```

This endpoint purchases access for a user.

### HTTP Request

`POST https://api.marketplace.tangle.works/purchaseData`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId         | true     | Your user ID                             |
| address     | true     | Device wallet address, where purchase amount will be transferred |
| value     | true     | Purchase amount in IOTA tokens |



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
        deviceId: 'star-wars',
        hashes: [
 		"YVDZUSERDHDGWWWUJLBUHJRZCZIDNEPTKIYAOCREQG9MQMNIQRR9CDZXCQZUBI9KYGPZ9FBRKCNFEX999",
         "DFJQKKGOFSOAGVL9BILDYHFEUQDRIEEISOXIYKMVZONAVMUKJSJXGKITBOYEUSFWZIQEQJJZIOB9MN999",
         "SZJTYS9JCQGGHWFFDCUGGZZYQQGGJJZCLFZKHTOORQECKNAPDINJUGKRDWDWDKQYYUKOZDJRXGBANT999",
         "JULBXP9OJEKHHBEQFKHYBNEEDQMKCBJVBLYXMONU9NHCBSJD9HFELAXORB9MDIVKQXS99HGTXQFYIM999"
        ]
      })
    });
  const json = await response.json();
  console.log(json);
}

sendRequest()
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
| id         | true     | Your user ID                             |
| device     | true     | The ID of the device's stream you'd like access to. |
| hashes     | true     | The `Array` of hashes from your attached purchase with the **correct** amount to the device's address. Hashes array is a response of the `purchaseData` call (`purchaseDataResult.transactions`) |


## Update Balance

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/updateBalance',
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

sendRequest()
```

> The above command returns JSON structured like this:

```json
{
    "success" : true
}
```

This endpoint updates balance of the users' wallet.

### HTTP Request

`POST https://api.marketplace.tangle.works/updateBalance`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| userId         | true     | Your user ID                             |
| deviceId     | true     | The ID of the device's stream you'd like access to. |


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
          timestamp: 1550053001462,
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

sendRequest()
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
const Mam = require('mam.client.js');
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
  const response = await fetch('https://api.marketplace.tangle.works/getDevicesByUser',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: '76D1ppAqXNOYPDCsEm9tAj5rPhG3'
      })
    });
  const json = await response.json();
  console.log(json);
}

sendRequest()
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

`POST https://api.marketplace.tangle.works/getDevicesByUser`

### Query Parameters

| Parameters | Required | Description                              |
| ---------- | -------- | ---------------------------------------- |
| uid         | true     | Your user ID                             |


## Remove Device 

```javascript
const fetch = require('node-fetch');

const sendRequest = async () => {
  const response = await fetch('https://api.marketplace.tangle.works/removeDevice',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: 'aaaaaaa-0b7a-4e44-7777-ef661777b9d2',
        id: 'star-wars-test',
      })
    });
  const json = await response.json();
  console.log(json);
}

sendRequest()
```

> The above command returns JSON structured like this:

```json
{
    "success" : true
}
```

This endpoint removes a device from the database.

### HTTP Request

`POST https://api.marketplace.tangle.works/removeDevice`

### Query Parameters

| Parameters | Required | Description                                         |
| ---------- | -------- | --------------------------------------------------- |
| apiKey     | true     | Your API key                                        |
| id         | true     | The ID of the device's stream you'd like access to. |