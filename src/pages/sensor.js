import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FB from '../utils/firebase';
import Mam from 'mam.client.js';
import { isEmpty } from 'lodash';
import { loadUser } from '../store/user/actions';
import { loadSensor } from '../store/sensor/actions';
import { getData, userAuth } from '../utils/auth-user';
import { iota, purchaseData, getBalance } from '../utils/utils';
import SensorNav from '../components/sensor-nav';
import Modal from '../components/modal/purchase';
import Sidebar from '../components/side-bar';
import DataStream from '../components/data-stream';
import api from '../utils/api';

class Sensor extends Component {
  static async getInitialProps({ query }) {
    return { id: query.id };
  }

  state = {
    packets: [],
    purchase: false,
    button: true,
    index: 0,
    loading: {
      heading: `Loading Device`,
      body: `Fetching device information and your purchase history. `,
    },
    error: false,
    fetching: false,
  };

  async componentDidMount() {
    // Firebase
    const firebase = await FB();
    const userId = (await userAuth(firebase)).uid;
    const {
      match: {
        params: { deviceId },
      },
    } = this.props;

    // Init Wallet
    this.fetchWallet(userId);

    await this.props.loadSensor(deviceId);

    // Get data
    const device = this.props.sensor;

    if (device.address) {
      device.balance = await getBalance(device.address);
    }

    if (typeof device === 'string') {
      return this.throw({
        body: ` The device you are looking for doesn't exist, check the device
ID and try again`,
        heading: `Device doesn't exist`,
      });
    }

    // Organise data for layout
    const layout = [];
    device.dataTypes.forEach((item, i) => {
      if (!layout[Math.floor(i / 2)]) {
        layout[Math.floor(i / 2)] = [];
      }
      layout[Math.floor(i / 2)].push(item);
    });

    this.setState({
      layout,
      userId,
    });
    // MAM
    this.fetch(userId);
  }

  throw = (error, button) => {
    this.setState({
      loading: false,
      error,
      button,
    });
  };

  fetch = async userId => {
    const {
      match: {
        params: { deviceId },
      },
    } = this.props;

    let data = await getData(userId, deviceId);
    if (typeof data === 'string') {
      if (data === 'No data to return') {
        return this.setState({ loading: false, purchase: true });
      }
      return this.setState({ loading: false });
    }

    if (data && data[0].time) {
      data = data.sort((a, b) => b.time - a.time);
    } else {
      return this.throw({
        body: 'Device data does not exist or is in an unrecognisable format.',
        heading: `Stream Read Failure`,
      });
    }
    console.log(data.length + ' Packets found.');
    this.fetchMam(data);
    this.setState({ mamData: data });
  };

  fetchMam = data => {
    try {
      if (!data[0]) {
        this.throw({
          body: 'Fail',
          heading: 'Fail',
        });
      }

      const mamState = Mam.init(iota);
      const device = this.props.sensor;
      mamState.channel.security = device.security || 2;

      const packets = data.splice(this.state.index, 10).map(async ({ root, sidekey }, i) => {
        const result = await Mam.fetchSingle(
          root,
          sidekey !== '' ? 'restricted' : null,
          sidekey !== '' ? sidekey : null,
          device.hash === 'curlp27' ? 27 : undefined
        );

        if (result && result.payload) {
          this.saveData(result.payload, i);
        } else {
          this.throw({
            body: 'Unable to read the packets of data from the device.',
            heading: 'Device Misconfigured',
          });
        }
      });
      return packets;
    } catch (e) {
      this.setState({ dataEnd: true });
    }
  };

  // Append datax
  saveData = (data, i) => {
    const input = iota.utils.fromTrytes(data);
    try {
      const packet = JSON.parse(input);
      const packets = [...this.state.packets, packet];
      this.setState({
        packets,
        purchase: true,
        fetching: false,
        index: i,
      });
    } catch (e) {
      console.error(e);
      console.log('Failing input: ', input);
    }
  };

  fetchWallet = async userId => {
    await this.props.loadUser(userId);
    const wallet = this.props.user.wallet;
    if (isEmpty(wallet) || !wallet.balance) {
      this.setState({ desc: 'Wallet not funded', walletLoading: false });
    } else {
      this.setState({
        desc: 'IOTA wallet balance:',
        walletLoading: false,
        error: false,
      });
    }
  };

  fund = async () => {
    const { userId } = this.state;
    this.setState({ desc: 'Funding wallet', walletLoading: true }, async () => {
      await api('setWallet', { userId });
      this.fetchWallet(userId);
    });
  };

  purchase = async () => {
    const { userId } = this.state;
    const device = this.props.sensor;

    if (!this.props.user) {
      await this.props.loadUser(userId);
    }

    // Make sure we have wallet
    const wallet = this.props.user.wallet;
    if (!wallet || isEmpty(wallet) || wallet.error) {
      return this.throw(
        {
          body: ` Setup wallet by clicking the top right, to get a prefunded IOTA wallet.`,
          heading: `Wallet doesn't exist`,
        },
        false
      );
    }
    if (Number(wallet.balance) < Number(device.price))
      return this.throw({
        body: `You have run out of IOTA. Click below to refill you wallet with IOTA.`,
        heading: `Not enough Balance`,
      });

    this.setState(
      {
        loading: {
          heading: `Purchasing Stream`,
          body: `You are doing Proof of Work to attach this purchase to the network.`,
        },
      },
      async () => {
        // Try purchase
        let purchaseResp;
        try {
          purchaseResp = await purchaseData(wallet.seed, device.address, Number(device.price));
        } catch (e) {
          console.log(e);
          return this.throw({
            body: e.message,
            heading: 'Purchase Failed',
          });
        }
        this.setState(
          {
            loading: {
              heading: 'Success!',
              body: `Your purchase was successfully. Fetching MAM stream and decoding data.`,
            },
          },
          async () => {
            const {
              match: {
                params: { deviceId },
              },
            } = this.props;
            const packet = {
              userId,
              deviceId,
              full: true,
              hashes: purchaseResp.map(bundle => bundle.hash),
            };

            const balanceUpdateResponse = await api('updateBalance', { userId, deviceId });
            await this.props.loadUser(userId);

            if (balanceUpdateResponse.success) {
              const message = await api('purchaseStream', packet);
              // Check Success
              if (message.success) {
                // Start Fetching data
                this.fetch(userId);
                // Update wallet balance
                return this.setState({
                  loading: true,
                  purchase: true,
                });
              } else {
                return this.throw({
                  body: message.error,
                  heading: 'Purchase Failed',
                });
              }
            } else {
              return this.throw({
                body: balanceUpdateResponse.error,
                heading: 'Purchase Failed',
              });
            }
          }
        );
      }
    );
  };

  loadMore = () => {
    if (this.state.packets[0] && !this.state.fetching) {
      this.setState({ fetching: true }, () => {
        this.fetchMam(this.state.mamData);
      });
    }
  };

  render() {
    const { purchase, loading, error, button } = this.state;
    const { sensor, user } = this.props;
    return (
      <Main>
        <SensorNav {...this.state} device={sensor} wallet={user.wallet || {}} fund={this.fund} />
        <Data>
          <Sidebar {...this.state} device={sensor} />
          <DataStream {...this.state} func={this.loadMore} />
        </Data>
        <Modal
          device={sensor}
          button={button}
          purchase={this.purchase}
          show={!purchase}
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

const mapStateToProps = state => ({
  sensor: state.sensor,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loadSensor: deviceId => dispatch(loadSensor(deviceId)),
  loadUser: userId => dispatch(loadUser(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sensor);
