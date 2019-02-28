# Data Marketplace

The Proof of Concept Data Marketplace built using MAM and IOTA Tangle.

Please read the series of technical blog posts to learn how to create new sensors, publish sensor data, and deploy your own instance of the Data Marketplace application.

* [Sensor Onboarding](https://blog.iota.org/iota-data-marketplace-tech-intro-d54b29774f1a-d54b29774f1a)

* [Publishing Sensor Data](https://blog.iota.org/the-iota-data-marketplace-a-tech-intro-part-3-eea5cbcd1eb7)

* [Cloud Backend Configuration](https://blog.iota.org/the-iota-data-marketplace-a-tech-intro-part4-47b608c527c9)

* [Checkout and Deploy your application](https://blog.iota.org/the-iota-data-marketplace-a-tech-intro-part5-b33d9856c852)



## Getting started

Before you can run this application, you will need to install `Node.js` on your machine. Once you've installed `Node.js`, you can use `npm` to run commands listed below.

### To run for Development.

```javascript
npm run install-all

npm run start
```

The application is running on http://localhost:3000


### To run for Production:

#### 1. Install Firebase CLI

Install the Firebase CLI by running the following command:

```javascript
npm install -g firebase-tools
```

#### 2. Log in fo Firebase

Log in to Firebase (for the first time use). Follow instructions on the screen.

```javascript
firebase login
```

#### 3. Install packages

```javascript
npm run install-all
```

#### 4. Build and deploy

```javascript
npm run deploy PROJECT_NAME
```
