import React from 'react'
import styled from 'styled-components'
import FB, { getData } from '../lib/db'
import IOTA from 'iota.lib.js'

import SensorNav from '../components/sensor-nav'
import Modal from '../components/modal'
import Sidebar from '../components/side-bar'
import DataStream from '../components/data-stream'

const iota = new IOTA({ provider: `http://p103.iotaledger.net:14700/` })

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id }
  }

  state = { deviceInfo: {}, packets: [] }

  async componentDidMount() {
    // Firebase
    const firebase = await FB()
    const store = firebase.firestore
    // Get data
    var userRef = store.collection('users').doc(`vwaiTFNKJAR9U30hrT8OCA1RgJF3`)
    var deviceRef = store.collection('devices').doc(this.props.id)
    var data = await getData(deviceRef, userRef, this.props.id)

    // Manipulate array to get the data in.
    var layout = []
    data.device.dataTypes.map((item, i) => {
      if (!layout[Math.floor(i / 2)]) layout[Math.floor(i / 2)] = []
      layout[Math.floor(i / 2)].push(item)
    })
    this.setState({ userRef, deviceRef, deviceInfo: data.device, layout })
    // MAM
    var mamState = Mam.init(iota)
    var packets = data.packets.map(async (packet, i) => {
      var packet = await Mam.fetchSingle(packet.root, null)
      this.saveData(packet.payload)
    })
  }
  // Append datax
  saveData = data => {
    console.log(JSON.parse(iota.utils.fromTrytes(data)))
    var packets = [
      ...this.state.packets,
      JSON.parse(iota.utils.fromTrytes(data))
    ]
    this.setState({ packets })
  }

  render() {
    var { deviceInfo, packets } = this.state
    return (
      <main>
        <SensorNav {...this.state} />
        <Data>
          <Sidebar {...this.state} />
          <DataStream {...this.state} />
        </Data>
        {/* <Modal /> */}
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
