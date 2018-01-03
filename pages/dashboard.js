import React from 'react'
import styled from 'styled-components'
import FB from '../lib/firebase-admin'

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
    return { id: query.id }
  }

  state = {
    devices: [],
    packets: [],
    user: false,
    button: true,
    index: 0,
    loading: {
      heading: `Loading User`,
      body: `Fetching your devices and account statistcs`
    },
    error: false,
    fetching: false
  }

  async componentDidMount() {
    // Init Wallet
    firebase = await FB()
    console.log(firebase)
    this.setState({ loading: false })
  }

  auth = channel => {
    let provider
    switch (channel) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('email')
        provider.addScope('profile')
        break
    }

    firebase
      .auth()
      .signInAnonymously()
      .then(data => {
        this.findDevices(data)
        this.setState({ user: data })
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        return errorMessage
      })
  }

  findDevices = user => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('devices')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id)
          this.setState({ devices: [...this.state.devices, doc.id] }, () => {
            return
          })
        })
      })
  }

  getDevice = device => {
    firebase
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

  createDevice = device => {
    console.log('Saving new device')
    console.log(device)
    // Check device doesn't exist
    // Add device to device list
    // Add device to profile
    // Add device key.

    //Push device into the local state.
  }

  render() {
    var { devices, packets, user, loading, error, button } = this.state
    return (
      <Main>
        <DeviceNav {...this.state} />
        <Data>
          <Sidebar {...this.state} />
          <DeviceList devices={devices} create={this.createDevice} />
        </Data>
        <LoginModal
          button={button}
          auth={this.auth}
          show={!user}
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
