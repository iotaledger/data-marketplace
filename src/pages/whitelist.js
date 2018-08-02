import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import { allDevices } from '../utils/firebase';
import api from '../utils/api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { devices: [], filtered: [], search: '' };

    this.change = this.change.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.search = this.search.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user.email.substr('iota.org')) {
        // User is signed in.
        const devices = await allDevices(firebase);
        this.setState({ devices, filtered: devices });
      } else {
        // User is signed out.
        console.log('Logged Out');
      }
    });
  };

  change(e) {
    this.setState({ search: e.target.value });
    return this.search(e.target.value);
  };

  // Search Func
  search(term) {
    if (!term || term === '') {
      return this.setState({ filtered: this.state.devices });
    }
    const filtered = this.state.devices.filter(
      device =>
        JSON.stringify(device)
          .toLowerCase()
          .indexOf(term.toLowerCase()) !== -1
    );
    return this.setState({ filtered });
  };

  async toggle(device) {
    try {
      device.inactive = !device.inactive;
      await api('toggleWhitelist', {
        sensorId: device.sensorId,
        isInactive: device.inactive.toString(),
      });

      this.setState({
        devices: this.state.devices.map(dev => (dev.sensorId === device.sensorId ? device : dev)),
      });
      this.search(this.state.search);
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    const { search, filtered } = this.state;
    return (
      <Main>
        <Heading>
          <h2>Marketplace Whitelist</h2>
          <span>Grey == Inactive, Green == Active</span>
          <div>
            <input
              type="search"
              value={search}
              onChange={this.change}
              placeholder="Enter search here..."
            />
          </div>
        </Heading>
        <CardsList>
          {filtered.filter(dev => !dev.inactive).map(device => CardModule(device, this.toggle))}
          {filtered.filter(dev => dev.inactive).map(device => CardModule(device, this.toggle))}
        </CardsList>
      </Main>
    );
  }
}

const CardModule = (device, toggle) => (
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
    <Link to={`/sensor/${device.sensorId}`} target="_blank">
      <Links>View Device</Links>
    </Link>
    <Links onClick={() => toggle(device)}>{device.inactive ? 'Activate' : 'Deactivate'}</Links>
  </Card>
);

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
`;

const Main = styled.div`
  overflow-x: hidden;
  padding-top: 50px;
  background: #fafafaff;
  min-height: 100vh;
  align-items: center;
`;

const Card = styled.div`
  flex: 0 0 200px;
  background: ${props => (props.inactive ? '#e2e2e2' : 'rgba(167, 234, 187, 1)')};
  padding: 10px;
  margin: 10px 10px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Field = styled.p`
  padding: 0 5px;
  font-size: ${props => (props.small ? `80%` : `100%`)};
`;

const Heading = Row.extend`
  position: fixed;
  top: 0;
  width: 100vw;
  background: rgba(138, 174, 230, 1);
  padding: 10px;
  justify-content: space-between;
`;

const CardsList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
`;
