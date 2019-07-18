## Data Marketplace functions

Firebase functions for Data Marketplace

#### Install Firebase CLI

Before you can install the Firebase CLI, you will need to install `Node.js` on your machine. Once you've installed `Node.js`, you can install the Firebase CLI using `npm` by running the following command:

```javascript
npm install -g firebase-tools
```

#### Install dependencies

Install dependencies listed in `functions` package.json files

```javascript
cd functions && yarn
```

#### Build project

Project is written in TypeScript, so you'll need to build it before deploying. This will create a new folder `lib` under `functions`.

```javascript
cd functions && yarn build
```

## Testing

To test this locally, run
`firebase functions:shell`

Then call a function with parameters
`getDevices.post('/getDevices').form({})`

#### Deploy fo Firebase

1.  Log in to Firebase (for the first time use). Follow instructions on the screen.

```javascript
firebase login
```

2.  Deploy

```javascript
firebase deploy --project PROJECT_NAME
firebase deploy --only functions:function1,functions:function2
```

### Handling function timeouts
Default timeout can be changed here https://console.cloud.google.com/functions/list
After you select your function and then press "Edit" it is located under the "More" drop-down at the bottom of the page. The current max is 540 seconds.
Read more https://firebase.google.com/docs/functions/manage-functions#set_timeout_and_memory_allocation


### CORS

See https://cloud.google.com/storage/docs/configuring-cors
You can also use the `gsutil cors` command to get the CORS configuration of a bucket:

```
gsutil cors get gs://marketplacev2.appspot.com
```

Use the `gsutil cors` command to configure CORS on a bucket:

```
gsutil cors set cors-config.json gs://marketplacev2.appspot.com
```
