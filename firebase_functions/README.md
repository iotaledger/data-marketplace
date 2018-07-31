## Data Marketplace functions

Firebase functions for Data Markertplace

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

1.  Check `.firebaserc`, make sure the Firebase project name is correct

```javascript
{
  "projects": {
    "default": "PROJECT_NAME_HERE"
  }
}
```

2.  Log in to Firebase (for the first time use). Follow instructions on the screen.

```javascript
firebase login
```

3.  Deploy

```javascript
firebase deploy
```
