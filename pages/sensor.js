import React from 'react'
import styled from 'styled-components'
import FB, { getData, deviceInfo } from '../lib/db'
import IOTA from 'iota.lib.js'

import SensorNav from '../components/sensor-nav'
import Modal from '../components/modal'
import Sidebar from '../components/side-bar'
import DataStream from '../components/data-stream'

const iota = new IOTA({ provider: `https://testnet140.tangle.works/` })

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id }
  }

  state = { deviceInfo: {}, packets: [], purchase: false, loading: true }

  async componentDidMount() {
    // Firebase
    const firebase = await FB()
    const store = firebase.firestore
    // Get data
    console.log(firebase.user.uid)
    var userRef = store.collection('users').doc(firebase.user.uid)
    var deviceRef = store.collection('devices').doc(this.props.id)
    var device = await deviceInfo(deviceRef, this.props.id)
    // Manipulate array to get the data in.
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
    this.setState({ packets, purchase: true, loading: false })
  }

  purchase = async () => {
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
    console.log(message)
    if (message._writeTime) {
      this.fetch(this.state.deviceRef, this.state.userRef)
      this.setState({ loading: true, purchase: true })
    }
  }

  render() {
    var { deviceInfo, packets, purchase, loading } = this.state
    return (
      <main>
        <SensorNav {...this.state} />
        <Data>
          <Sidebar {...this.state} />
          <DataStream {...this.state} />
        </Data>
        <Modal purchase={this.purchase} show={!purchase} loading={loading} />
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
