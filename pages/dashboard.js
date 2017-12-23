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
import Modal from '../components/modal'
import Sidebar from '../components/user-sidebar'
import DeviceList from '../components/device-list'

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
    const firebase = await FB()
  }

  throw = (error, button) => {
    this.setState({
      loading: false,
      error,
      button
    })
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

  render() {
    var { deviceInfo, packets, purchase, loading, error, button } = this.state
    return (
      <Main>
        <DeviceNav {...this.state} />
        <Data>
          <Sidebar {...this.state} />
          <DeviceList />
        </Data>
        {/* <Modal
          button={button}
          purchase={this.purchase}
          show={!purchase}
          loading={loading}
          error={error}
        /> */}
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
