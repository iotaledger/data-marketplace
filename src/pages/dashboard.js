import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import firebase from 'firebase/app';
import { loadUser, logout } from '../store/user/actions';
import api from '../utils/api';
import DeviceNav from '../components/device-nav';
import LoginModal from '../components/login-modal';
import GrandModal from '../components/modal/grandfather';
import Sidebar from '../components/user-sidebar';
import DeviceList from '../components/device-list';

class Dashboard extends Component {
  static async getInitialProps({ query }) {
    return { grandfather: query.grandfather !== undefined };
  }

  state = {
    devices: [],
    packets: [],
    user: {},
    button: true,
    grandModal: false,
    index: 0,
    loading: {
      heading: 'Loading User',
      body: 'Fetching your devices and account statistcs',
    },
    error: false,
    fetching: false,
  };

  async componentDidMount() {
    if (this.props.grandfather) this.setState({ grandfather: true });
    // Init Wallet
    this.checkLogin();
  }

  checkLogin = () => {
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

  auth = () => {
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
      })
      .catch(error => {
        console.error('auth error', error);
      });
  };

  getUser = async () => {
    this.findDevices();
    await this.props.loadUser(this.state.user.uid);
    this.setState({ loading: false });
  };

  findDevices = async () => {
    this.setState({ loading: true });
    const devices = await api('getDevicesByUser', { uid: this.state.user.uid });
    return this.setState({ devices, loading: false });
  };

  throw = (error, button) => {
    this.setState({
      loading: false,
      error,
      button,
    });
  };

  createDevice = device => {
    const { userData } = this.props;
    // Assign to user
    device.owner = this.state.user.uid;
    // Deactivate the Device
    device.inactive = true;

    return new Promise(async (response, reject) => {
      const packet = {
        apiKey: userData.apiKey,
        id: device.sensorId,
        device,
      };

      // Call server
      const data = await api('newDevice', packet);
      // Check success
      if (data.success) {
        this.findDevices();
      }
      response(data);
    });
  };

  deleteDevice = async deviceId => {
    this.setState({ loading: true });
    const { userData } = this.props;
    const data = await api('removeDevice', { apiKey: userData.apiKey, id: deviceId });
    if (data.success) {
      return this.setState({
        loading: false,
        devices: [...this.state.devices.filter(device => device.sensorId !== deviceId)],
      });
    } else {
      alert('Could not Delete Device');
      return this.setState({
        loading: false,
      });
    }
  };

  logout = () => {
    this.props.logout();
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('Logged Out');
        this.setState({ user: {}, devices: [] });
      })
      .catch(error => {
        console.error('logout error', error);
      });
  };

  // Show grandfather modal
  toggleGrand = () => {
    this.setState({ grandModal: true });
  };

  grandfather = (id, sk) => {
    this.setState(
      {
        loading: {
          heading: 'Sending Request',
          body: 'Adding device to you account.',
        },
      },
      async () => {
        const packet = {
          owner: this.state.user.uid,
          sk,
          id,
        };

        // Call server
        const data = await api('grandfather', packet);

        if (data.error) {
          /// Add error
          this.throw({ heading: 'Error', body: data.error }, true);
        } else {
          console.log('Dashboard grandfather', data);
          window.location.reload(true);
        }
      }
    );
  };

  render() {
    const { devices, user, loading, error, button, grandModal } = this.state;
    const { userData } = this.props;
    return (
      <Main>
        <DeviceNav {...this.state} logout={this.logout} />
        <Data>
          <Sidebar {...this.state} userData={userData} toggleGrand={this.toggleGrand} />
          <DeviceList
            devices={devices}
            maxDevices={userData.numberOfDevices}
            create={this.createDevice}
            delete={this.deleteDevice}
          />
        </Data>
        <LoginModal
          button={button}
          auth={this.auth}
          show={isEmpty(user)}
          loading={loading}
          error={error}
        />
        <GrandModal
          button={button}
          grandfather={this.grandfather}
          show={grandModal && !isEmpty(user)}
          loading={loading}
          error={error}
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
