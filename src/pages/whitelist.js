import React from 'react'
import styled from 'styled-components'
import { Link } from '../routes.js'
import FB from '../lib/firebase'
import { allDevices } from '../lib/auth-user'

export default class extends React.Component {
  state = { devices: [], filtered: [] }
  componentDidMount = async () => {
    // Firebase
    this.firebase = await FB()
    this.checkUser()
  }

  checkUser = () => {
    this.firebase.auth().onAuthStateChanged(async user => {
      if (user.email.substr('iota.org')) {
        // User is signed in.
        const devices = await allDevices(this.firebase)
        this.setState({ devices, filtered: devices })
        console.log(user)
      } else {
        // User is signed out.
        console.log('Logged Out')
      }
    })
  }

  change = e => {
    this.setState({ search: e.target.value })
    return this.search(e.target.value)
  }

  // Search Func
  search = term => {
    if (!term || term == '') {
      return this.setState({ filtered: this.state.devices })
    }
    const filtered = this.state.devices.filter(
      device =>
        JSON.stringify(device)
          .toLowerCase()
          .indexOf(term.toLowerCase()) !== -1
    )
    return this.setState({ filtered })
  }

  toggle = async (device, i) => {
    device.inactive = !device.inactive
    try {
      await this.firebase
        .firestore()
        .collection('devices')
        .doc(device.sensorId)
        .set({ inactive: device.inactive }, { merge: true })

      this.setState({
        devices: this.state.devices.map(dev => (dev.sensorId == device.sensorId ? device : dev)),
      })
      this.search(this.state.search)
    } catch (e) {
      alert(e.message)
    }
  }
  render() {
    const { search, filtered } = this.state
    return (
      <Main>
        <Heading>
          <h2>Marketplace Whitelist</h2>
          <span>Grey == Inactive, Green == Active</span>
          <div>
            <input
              type={'search'}
              value={search}
              onChange={e => this.change(e)}
              placeholder="Enter search here..."
            />
          </div>
        </Heading>
        <CardsList>
          {filtered
            .filter(dev => !dev.inactive)
            .map((device, i) => CardModule(device, i, this.toggle))}
          {filtered
            .filter(dev => dev.inactive)
            .map((device, i) => CardModule(device, i, this.toggle))}
        </CardsList>
      </Main>
    )
  }
}

const CardModule = (device, i, toggle) => (
  <Card inactive={device.inactive} key={`device-${device.sensorId}`}>
    <Row>
      <Field>{device.sensorId}</Field>
      <Field small>{device.type}</Field>
    </Row>
    <Row>
      <Field>
        {device.location && `Location: ${device.location.city}, ${device.location.country}`}
      </Field>
    </Row>
    <Link to={`/sensor/${device.sensorId}`}>
      <Links target="_blank"> View Device</Links>
    </Link>
    <Links onClick={() => toggle(device, i)}>{device.inactive ? 'Activate' : 'Deactivate'}</Links>
  </Card>
)

const Links = styled.div`
  width: 100%;
  padding: 5px 8px;
  background: rgba(230, 138, 138, 1);
  color: white;
  text-align: center;
  margin: 5px 2px;
  cursor: pointer;
  &:hover {
    background: palevioletred;
  }
`

const Main = styled.div`
  overflow-x: hidden;
  padding-top: 50px;
  background: #fafafaff;
  min-height: 100vh;
  align-items: center;
`
const Card = styled.div`
  flex: 0 0 200px;
  background: ${props => (props.inactive ? '#e2e2e2' : 'rgba(167, 234, 187, 1)')};
  padding: 10px;
  margin: 10px 10px;
`
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const Field = styled.p`
  padding: 0 5px;
  font-size: ${props => (props.small ? `80%` : `100%`)};
`

const Heading = Row.extend`
  position: fixed;
  top: 0;
  width: 100vw;
  background: rgba(138, 174, 230, 1);
  padding: 10px;
  justify-content: space-between;
`
const CardsList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
`
