import React from 'react'
import styled from 'styled-components'
import FB, { getData, deviceInfo } from '../lib/db'
import {
  iota,
  initWallet,
  purchaseData,
  reducer,
  getBalance
} from '../lib/iota'

import SensorNav from '../components/sensor-nav'
import Modal from '../components/modal'
import Sidebar from '../components/side-bar'
import DataStream from '../components/data-stream'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id }
  }

  state = {
    deviceInfo: {},
    packets: [],
    purchase: false,
    button: true,
    index: 0,
    loading: {
      heading: `Loading Device`,
      body: `Fetching device information and your purchase history. `
    },
    error: false,
    fetching: false
  }

  async componentDidMount() {
    // Init Wallet
    this.fetchWallet()
    // Firebase
    const firebase = await FB()
    const store = firebase.firestore
    // Get data
    let userRef = store.collection('users').doc(firebase.user.uid)
    let deviceRef = store.collection('devices').doc(this.props.id)
    let device = await deviceInfo(deviceRef, this.props.id)
    if (device.address) device.balance = await getBalance(device.address)
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

  throw = (error, button) => {
    this.setState({
      loading: false,
      error,
      button
    })
  }

  fetch = async (deviceRef, userRef) => {
    var data = await getData(deviceRef, userRef, this.props.id)
    if (typeof data == 'string') return this.setState({ loading: false })
    if (data && data[0].time) {
      data = data.sort((a, b) => b.time - a.time)
    } else {
      return this.throw({
        body: 'Device data does not exist or is in an unrecognisable format.',
        heading: `Stream Read Failure`
      })
    }
    console.log(data.length + ' Packets found.')
    this.fetchMam(data)
    this.setState({ mamData: data })
  }

  fetchMam = data => {
    try {
      if (!data[0]) throw 'Fail'
      var mamState = Mam.init(iota)
      mamState.channel.security = this.state.deviceInfo.security || 2

      var packets = data.splice(this.state.index, 20).map(async (packet, i) => {
        var packet = await Mam.fetchSingle(
          packet.root,
          packet.sidekey !== '' ? 'restricted' : null,
          packet.sidekey !== '' ? packet.sidekey : null,
          this.state.deviceInfo.hash === 'curlp27' ? 27 : undefined
        )

        if (packet) {
          this.saveData(packet.payload, i)
        } else {
          this.throw({
            body: 'Unable to read the packets of data from the device.',
            heading: `Device Misconfigured`
          })
        }
      })
    } catch (e) {
      this.setState({ dataEnd: true })
    }
  }

  // Append datax
  saveData = (data, i) => {
    let input = iota.utils.fromTrytes(data)
    try {
      var packet = JSON.parse(input)
      console.log(packet)
      var packets = [...this.state.packets, packet]
      this.setState({
        packets,
        purchase: true,
        fetching: false,
        index: i
      })
    } catch (e) {
      console.error(e)
      console.log('Failing input: ', input)
    }
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
      await localStorage.setItem('wallet', JSON.stringify(wallet))
      this.setState({
        walletInit: true,
        desc: 'IOTA wallet balance:',
        walletLoading: false,
        wallet,
        error: false
      })
    })
  }

  purchase = async () => {
    const device = this.state.deviceInfo
    // Make sure we have wallet
    let wallet = JSON.parse(await localStorage.getItem('wallet'))
    if (!wallet)
      return this.throw(
        {
          body: ` Setup wallet by clicking the top right, to get a prefunded IOTA wallet.`,
          heading: `Wallet doesn't exist`
        },
        false
      )
    if (wallet.amount < device.value)
      return this.throw({
        body: `You have run out of IOTA. Click below to refill you wallet with IOTA.`,
        heading: `Not enough Balance`
      })

    this.setState(
      {
        loading: {
          heading: `Purchasing Stream`,
          body: `You are doing Proof of Work to attach this purchase to the network.`
        }
      },
      async () => {
        // Try purchase
        try {
          let response = await purchaseData(
            wallet.seed,
            device.address,
            device.value
          )
          this.setState({
            loading: {
              heading: `Success!`,
              body: `Your purchase was successful. Fetching MAM stream and decoding data.`
            }
          })
        } catch (e) {
          return this.throw({
            body: e.error,
            heading: `Purchase Failed`
          })
        }
        var packet = {
          id: this.state.uid,
          device: this.props.id,
          full: true
        }
        var resp = await fetch(
          'https://us-central1-datamarket-617e1.cloudfunctions.net/purchaseStream',
          {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(packet)
          }
        )
        var message = JSON.parse(await resp.json())
        if (message._writeTime) {
          wallet.amount = wallet.balance - device.value
          this.fetch(this.state.deviceRef, this.state.userRef)
          this.setState({ loading: true, purchase: true, wallet })
          await localStorage.setItem('wallet', JSON.stringify(wallet))
        }
      }
    )
  }

  loadMore = () => {
    if (this.state.packets[0] && !this.state.fetching) {
      this.setState({ fetching: true }, () => {
        this.fetchMam(this.state.mamData)
      })
    }
  }

  render() {
    var { deviceInfo, packets, purchase, loading, error, button } = this.state
    return (
      <Main>
        <SensorNav {...this.state} fund={this.fund} />
        <Data>
          <Sidebar {...this.state} />
          <DataStream {...this.state} func={this.loadMore} />
        </Data>
        <Modal
          button={button}
          purchase={this.purchase}
          show={!purchase}
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
