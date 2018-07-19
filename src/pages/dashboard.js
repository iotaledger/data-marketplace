import React from 'react';
import styled from 'styled-components';
import FB from '../lib/firebase';
import api from '../utils/api';
import DeviceNav from '../components/device-nav';
import LoginModal from '../components/login-modal';
import GrandModal from '../components/modal/grandfather';
import Sidebar from '../components/user-sidebar';
import DeviceList from '../components/device-list';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { grandfather: query.grandfather !== undefined };
  }

  state = {
    devices: [],
    packets: [],
    user: false,
    button: true,
    grandModal: false,
    index: 0,
    loading: {
      heading: `Loading User`,
      body: `Fetching your devices and account statistcs`,
    },
    userData: {},
    error: false,
    fetching: false,
  };

  async componentDidMount() {
    if (this.props.grandfather) this.setState({ grandfather: true });
    // Init Wallet
    this.firebase = await FB();
    this.checkLogin();
  }
  checkLogin = () => {
    this.firebase.auth().onAuthStateChanged(user => {
      if (user && !user.isAnonymous) {
        // User is signed in.
        this.getUser(user);
      } else {
        // No user is signed in.
        this.setState({ loading: false });
      }
    });
  };
  auth = channel => {
    let provider;
    switch (channel) {
      case 'google':
        provider = new this.firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        break;
      default:
        break;
    }

    this.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        this.getUser(user);
      })
      .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  };

  getUser = async user => {
    this.findDevices(user);
    const userData = await api('getUser', { userId: user.uid });
    if (userData) {
      this.setState({
        user,
        userData,
        loading: false,
      });
    }
  };

  findDevices = async ({ uid }) => {
    this.setState({ loading: true });
    const devices = await api('getDevicesByUser', { uid });
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
    console.log('Saving new device');
    console.log(this.state.userData);

    // Assign to user
    device.owner = this.state.user.uid;
    // Deactivate the Device
    device.inactive = true;

    return new Promise(async (res, rej) => {
      const packet = {
        apiKey: this.state.userData.apiKey,
        id: device.sensorId,
        device,
      };
      console.log('createDevice', packet);

      // Call server
      const data = await api('newDevice', packet);
      // Check success
      if (data.success) {
        this.findDevices(this.state.user);
      }
      res(data);
    });
  };

  deleteDevice = async deviceId => {
    this.setState({ loading: true });
    const { apiKey } = this.state.userData;
    const data = await api('removeDevice', { apiKey, id: deviceId });
    if (data.success) {
      return this.setState({
        loading: false,
        devices: [...this.state.devices.filter(device => device.sensorId !== deviceId)],
      });
    } else {
      alert(`Couldn't Delete Device`);
      return this.setState({
        loading: false,
      });
    }
  };

  logout = () => {
    this.firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('Logged Out');
        this.setState({ user: false, devices: [], userData: {} });
      })
      .catch(function(error) {
        // An error happened.
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
          // console.log('Dashboard grandfather', data);
          location.reload();
        }
      }
    );
  };
  render() {
    const { devices, user, loading, error, button, grandModal } = this.state;
    return (
      <Main>
        <DeviceNav {...this.state} logout={this.logout} />
        <Data>
          <Sidebar {...this.state} toggleGrand={this.toggleGrand} />
          <DeviceList devices={devices} create={this.createDevice} delete={this.deleteDevice} />
        </Data>
        <LoginModal button={button} auth={this.auth} show={!user} loading={loading} error={error} />
        <GrandModal
          button={button}
          grandfather={this.grandfather}
          show={grandModal && user}
          loading={loading}
          error={error}
        />
      </Main>
    );
  }
}
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
