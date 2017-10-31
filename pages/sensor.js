import React from 'react'
import styled from 'styled-components'
import FB, { getData, deviceInfo } from '../lib/db'
import IOTA from 'iota.lib.js'
import { initWallet, purchase, reducer } from '../lib/iota'

import SensorNav from '../components/sensor-nav'
import Modal from '../components/modal'
import Sidebar from '../components/side-bar'
import DataStream from '../components/data-stream'

const iota = new IOTA({ provider: `https://testnet140.tangle.works/` })

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id }
  }

  state = {
    deviceInfo: {},
    packets: [],
    purchase: false,
    loading: true,
    error: false
  }

  async componentDidMount() {
    // Init Wallet
    this.fetchWallet()
    // Firebase
    const firebase = await FB()
    const store = firebase.firestore
    // Get data
    var userRef = store.collection('users').doc(firebase.user.uid)
    var deviceRef = store.collection('devices').doc(this.props.id)
    var device = await deviceInfo(deviceRef, this.props.id)
    if (typeof device == 'string')
      return this.throw({
        body: ` The device you are looking for doesn't exist, check the device
ID and try again`,
        heading: `Device doesn't exist`
      })
    // Organise data for layout
    var layout = []
    device.dataTypes.map((item, i) => {
      if (!layout[Math.floor(i / 2)]) layout[Math.floor(i / 2)] = []
      layout[Math.floor(i / 2)].push(item)
    })
    this.setState({
      userRef,
      deviceRef,
      deviceInfo: device,
      layout,
      uid: firebase.user.uid
    })
    // MAM
    this.fetch(deviceRef, userRef)
  }
  throw = error => {
    this.setState({
      loading: false,
      error
    })
  }

  fetch = async (deviceRef, userRef) => {
    var data = await getData(deviceRef, userRef, this.props.id)
    if (typeof data == 'string') return this.setState({ loading: false })

    var mamState = Mam.init(iota)
    var packets = data.map(async (packet, i) => {
      var packet = await Mam.fetchSingle(packet.root, null)
      if (packet) this.saveData(packet.payload)
    })
  }

  // Append datax
  saveData = data => {
    console.log(JSON.parse(iota.utils.fromTrytes(data)))
    var packets = [
      ...this.state.packets,
      JSON.parse(iota.utils.fromTrytes(data))
    ]
    this.setState({ packets, purchase: true })
  }

  fetchWallet = async () => {
    var wallet = JSON.parse(await localStorage.getItem('wallet'))
    if (!wallet) {
      this.setState({ desc: 'Wallet not funded', walletLoading: false })
    } else {
      this.setState({
        desc: 'IOTA wallet balance:',
        wallet,
        walletInit: true,
        walletLoading: false
      })
    }
  }

  fund = async () => {
    this.setState({ desc: 'Funding wallet', walletLoading: true }, async () => {
      var wallet = await initWallet()
      console.log(wallet)
      await localStorage.setItem('wallet', JSON.stringify(wallet))
      this.setState({
        walletInit: true,
        desc: 'IOTA wallet balance:',
        walletLoading: false,
        wallet
      })
    })
  }

  purchase = async (address, value) => {
    // Make sure we have wallet
    var wallet = JSON.parse(await localStorage.getItem('wallet'))
    if (!wallet)
      return this.throw({
        body: ` Setup wallet by clicking the top right, to get a prefunded IOTA wallet.`,
        heading: `Wallet doesn't exist`
      })
    if (wallet.amount < value)
      return this.throw({
        body: `You have run out of IOTA. Click below to refill you wallet with IOTA.`,
        heading: `Not enough Balance`
      })
    // Try purchase
    try {
      var purchase = await purchase(wallet.seed, address, value)
    } catch (e) {
      return this.throw({
        body: e,
        heading: `Purchase Failed`
      })
    }
    var packet = {
      id: this.state.uid,
      device: this.props.id,
      full: true
    }
    var resp = await fetch('/purchase', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packet)
    })
    var message = JSON.parse(await resp.json())

    if (message._writeTime) {
      wallet.amount = wallet.amount - value
      this.fetch(this.state.deviceRef, this.state.userRef)
      this.setState({ loading: true, purchase: true, wallet })
    }
  }

  render() {
    var { deviceInfo, packets, purchase, loading, error } = this.state
    return (
      <main>
        <SensorNav {...this.state} fund={this.fund} />
        <Data>
          <Sidebar {...this.state} />
          <DataStream {...this.state} />
        </Data>
        <Modal
          purchase={this.purchase}
          show={!purchase}
          loading={loading}
          error={error}
        />
      </main>
    )
  }
}
const Data = styled.section`
  background-image: linear-gradient(-189deg, #06236c 1%, #1449c6 95%);
  min-height: 90vh;
  position: relative;
  display: flex;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`
