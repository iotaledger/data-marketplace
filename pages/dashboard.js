import React from 'react'
import styled from 'styled-components'
import FB from '../lib/firebase'

import {
  iota,
  initWallet,
  purchaseData,
  reducer,
  getBalance
} from '../lib/iota'

import DeviceNav from '../components/device-nav'
import LoginModal from '../components/login-modal'
import Sidebar from '../components/user-sidebar'
import DeviceList from '../components/device-list'

var firebase = {}

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { grandfather: query.grandfather !== undefined }
  }

  state = {
    devices: [],
    packets: [],
    user: false,
    button: true,
    grandModal: false,
    index: 0,
    loading: {
      heading: `Loading User`,
      body: `Fetching your devices and account statistcs`
    },
    error: false,
    fetching: false
  }

  async componentDidMount() {
    if (this.props.grandfather) this.setState({ grandfather: true })
    // Init Wallet
    this.firebase = await FB()
    console.log(this.firebase)
    this.checkLogin()
  }
  checkLogin = () => {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user && !user.isAnonymous) {
        // User is signed in.
        console.log(user)
        this.getUser(user)
      } else {
        // No user is signed in.
        this.setState({ loading: false })
      }
    })
  }
  auth = channel => {
    let provider
    switch (channel) {
      case 'google':
        provider = new this.firebase.auth.GoogleAuthProvider()
        provider.addScope('email')
        provider.addScope('profile')
        break
    }

    this.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        // The signed-in user info.
        var user = result.user
        this.getUser(user)
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
      })
  }

  getUser = user => {
    this.findDevices(user)
    this.firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({
          user: user,
          userData: doc.data(),
          loading: false,
          firebase
        })
      })
  }

  findDevices = user => {
    this.firebase
      .firestore()
      .collection('devices')
      .where('owner', '==', user.uid)
      .get()
      .then(querySnapshot => {
        var devices = []
        querySnapshot.forEach(doc => {
          console.log(doc.id)
          devices.push(doc.data())
          if (devices.length == querySnapshot.size)
            return this.setState({ devices })
        })
      })
  }

  getDevice = device => {
    this.firebase
      .firestore()
      .collection('devices')
      .doc(device)
      .get()
      .then(function(doc) {
        console.log(doc.id, ' => ', doc.data())
      })
      .catch(function(error) {
        console.error('Error adding document: ', error)
      })
  }
  throw = (error, button) => {
    this.setState({
      loading: false,
      error,
      button
    })
  }

  createDevice = (device, sk) => {
    console.log('Saving new device')
    console.log(device)
    console.log(this.state.userData)

    // Assign to user
    device.owner = this.state.user.uid

    // Add Address
    return new Promise((res, rej) => {
      this.firebase
        .firestore()
        .collection('devices')
        .doc(device.sensorId)
        .get()
        .then(async doc => {
          // Check device doesn't exist
          if (doc.exists) {
            console.log('Device exists')
            return { err: `Device Exists` }
          } else {
            // Add cloud function call
            var resp = await fetch(
              `https://us-central1-${
                process.env.FIREBASEID
              }.cloudfunctions.net/newDevice`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  apiKey: this.state.userData.apiKey,
                  id: device.sensorId,
                  sk,
                  device
                })
              }
            )
            this.setState({ devices: [...this.state.devices, device] })
            res({ success: true })
          }
        })
        .catch(err => {
          console.log(err)
          res({ err: 'An Error Occured' })
        })
      //Push device into the local state.
    })
  }

  deleteDevice = async id => {
    await fetch(
      `https://us-central1-${
        process.env.FIREBASEID
      }.cloudfunctions.net/removeDevice`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: this.state.userData.apiKey,
          id
        })
      }
    )
    this.setState({
      devices: [...this.state.devices.filter(device => device.sensorId !== id)]
    })
    return { success: true }
  }

  logout = () => {
    this.firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('Logged Out')
        this.setState({ user: false, devices: [] })
      })
      .catch(function(error) {
        // An error happened.
      })
  }
  // Show grandfather modal
  toggleGrand = () => {
    this.setState({ grandModal: true })
  }
  grandfather = async () => {
    await fetch(
      `https://us-central1-${
        process.env.FIREBASEID
      }.cloudfunctions.net/grandfather`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sk: this.state.userData.apiKey,
          id
        })
      }
    )
    this.setState({
      devices: [...this.state.devices.filter(device => device.sensorId !== id)]
    })
  }
  render() {
    var {
      devices,
      packets,
      user,
      loading,
      error,
      button,
      grandModal
    } = this.state
    return (
      <Main>
        <DeviceNav {...this.state} logout={this.logout} />
        <Data>
          <Sidebar {...this.state} toggleGrand={this.toggleGrand} />
          <DeviceList
            devices={devices}
            create={this.createDevice}
            delete={this.deleteDevice}
          />
        </Data>
        <LoginModal
          button={button}
          auth={this.auth}
          show={!user}
          loading={loading}
          error={error}
        />
        <LoginModal
          button={button}
          grandfather={this.grandfather}
          show={grandModal && user}
          loading={loading}
          error={error}
        />
      </Main>
    )
  }
}
const Main = styled.main`
  width: 100vw;
  height: 100vh;
`

const Data = styled.section`
  background-image: linear-gradient(-189deg, #06236c 1%, #1449c6 95%);
  min-height: 90vh;
  position: relative;
  display: flex;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`
