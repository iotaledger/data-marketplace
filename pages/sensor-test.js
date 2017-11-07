import React from 'react'
import styled from 'styled-components'
import FB, { getData, deviceInfo, crossRef } from '../lib/db'
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

  state = {
    deviceInfo: {},
    packets: [],
    purchase: true,
    loading: true,
    error: false
  }

  async componentDidMount() {
    // Firebase
    const firebase = await FB()
    const store = firebase.firestore
    // Get data
    console.log(firebase.user.uid)
    var deviceRef = store.collection('devices').doc(this.props.id)
    var device = await deviceInfo(deviceRef, this.props.id)
    if (typeof device == 'string') return this.throw()
    // Manipulate array to get the data in.
    var layout = []
    device.dataTypes.map((item, i) => {
      if (!layout[Math.floor(i / 2)]) layout[Math.floor(i / 2)] = []
      layout[Math.floor(i / 2)].push(item)
    })
    this.setState({
      deviceRef,
      deviceInfo: device,
      layout,
      uid: firebase.user.uid
    })

    // MAM
    this.fetch(deviceRef)
  }
  throw = () => {
    this.setState({
      purchase: false,
      loading: false,
      error: {
        body: `Couldn't find any data. Check device ID and ensure its running.`,
        heading: `No Data`
      }
    })
  }

  fetch = async deviceRef => {
    var data = await crossRef((data = { full: true }), deviceRef)
    if (typeof data == 'string') return this.setState({ loading: false })
    if (data.length == 0) return this.throw()

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

  render() {
    var { deviceInfo, packets, purchase, loading, error } = this.state
    return (
      <main>
        <SensorNav {...this.state} />
        <Data>
          <Sidebar {...this.state} />
          <DataStream {...this.state} />
          <Modal
            purchase={this.purchase}
            show={!purchase}
            loading={loading}
            error={error}
          />
        </Data>
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
