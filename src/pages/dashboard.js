import React from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import isEmpty from 'lodash-es/isEmpty';
import styled from 'styled-components';
import firebase from 'firebase/app';
import { loadUser, logout } from '../store/user/actions';
import api from '../utils/api';
import DeviceNav from '../components/device-nav';
import LoginModal from '../components/login-modal';
import Sidebar from '../components/user-sidebar';
import DeviceList from '../components/device-list';
import Cookie from '../components/cookie';
import Loading from '../components/loading';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      user: {},
      loading: false,
    };

    this.checkLogin = this.checkLogin.bind(this);
    this.auth = this.auth.bind(this);
    this.getUser = this.getUser.bind(this);
    this.findDevices = this.findDevices.bind(this);
    this.createDevice = this.createDevice.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    ReactGA.pageview('/dashboard');
    // Init Wallet
    this.checkLogin();
  }

  checkLogin() {
    firebase.auth().onAuthStateChanged(user => {
      if (user && !user.isAnonymous) {
        // User is signed in.
        this.setState({ user });
        this.getUser();
      } else {
        // No user is signed in.
        this.setState({ loading: false });
      }
    });
  };

  auth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.setState({ user });
        this.getUser();
        ReactGA.event({
          category: 'Login',
          action: 'Login',
          label: `User UID ${user.uid}`
        });
      })
      .catch(error => {
        console.error('auth error', error);
      });
  };

  async getUser() {
    await this.props.loadUser(this.state.user.uid);
    await this.findDevices();
  };

  async findDevices() {
    this.setState({ loading: true });
    const devices = await api.get('devices', { userId: this.state.user.uid, apiKey: this.props.userData.apiKey }) || [];
    return this.setState({ devices, loading: false });
  };

  createDevice(device) {
    const { userData } = this.props;
    // Assign to user
    device.owner = this.state.user.uid;
    // Deactivate the Device
    device.inactive = true;

    return new Promise(async (resolve) => {
      const packet = {
        apiKey: userData.apiKey,
        id: device.sensorId,
        device,
      };

      // Call server
      const data = await api.post('newDevice', packet);
      // Check success
      if (data.success) {
        this.findDevices();
      }
      resolve(data);
      ReactGA.event({
        category: 'New device',
        action: 'New device',
        label: `Device ID ${device.sensorId}`
      });
    });
  };

  async deleteDevice(deviceId) {
    ReactGA.event({
      category: 'Delete device',
      action: 'Delete device',
      label: `Device ID ${deviceId}`
    });
    this.setState({ loading: true });
    const { userData } = this.props;
    const data = await api.delete('delete', { apiKey: userData.apiKey, deviceId });
    if (data.success) {
      this.setState({
        loading: false,
        devices: [...this.state.devices.filter(device => device.sensorId !== deviceId)],
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  logout() {
    this.props.logout();
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.setState({ user: {}, devices: [] });
      })
      .catch(error => {
        console.error('logout error', error);
      });
  };

  render() {
    const { devices, user, loading } = this.state;
    const { userData } = this.props;

    return (
      <Main>
        <Cookie />
        <DeviceNav user={user} logout={this.logout} />
        <Data>
          <Sidebar devices={devices} user={user} userData={userData} />
          {
            loading ? (
              <LoadingBox>
                <Loading />
              </LoadingBox>
            ) : (
              <DeviceList
                devices={devices}
                maxDevices={userData.numberOfDevices}
                create={this.createDevice}
                delete={this.deleteDevice}
              />
            )
          }
        </Data>
        <LoginModal
          auth={this.auth}
          show={isEmpty(user)}
          loading={loading}
        />
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user,
});

const mapDispatchToProps = dispatch => ({
  loadUser: userId => dispatch(loadUser(userId)),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;

const Data = styled.section`
  background-image: linear-gradient(-189deg, #06236c 1%, #1449c6 95%);
  min-height: 90vh;
  position: relative;
  display: flex;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const LoadingBox = styled.div`
  margin: auto;
`;