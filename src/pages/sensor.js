import React from 'react';
import styled from 'styled-components';
import FB from '../lib/firebase';
import Mam from 'mam.client.js';
import { isEmpty } from 'lodash';
import { getData, getDevice, userAuth } from '../lib/auth-user';
import { iota, initWallet, purchaseData, getBalance } from '../lib/utils';
import SensorNav from '../components/sensor-nav';
import Modal from '../components/modal/purchase';
import Sidebar from '../components/side-bar';
import DataStream from '../components/data-stream';
import api from '../utils/api';

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id };
  }

  state = {
    deviceInfo: {},
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
    const { uid } = await userAuth(firebase);
    const {
      match: {
        params: { id },
      },
    } = this.props;

    // Init Wallet
    this.fetchWallet(uid);

    // Get data
    const device = await getDevice(id);

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
      deviceInfo: device,
      layout,
      uid,
    });
    // MAM
    this.fetch(uid);
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
        params: { id },
      },
    } = this.props;

    let data = await getData(userId, id);
    if (typeof data === 'string') {
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
      mamState.channel.security = this.state.deviceInfo.security || 2;

      const packets = data.splice(this.state.index, 10).map(async ({ root, sidekey }, i) => {
        const result = await Mam.fetchSingle(
          root,
          sidekey !== '' ? 'restricted' : null,
          sidekey !== '' ? sidekey : null,
          this.state.deviceInfo.hash === 'curlp27' ? 27 : undefined
        );

        if (result && result.payload) {
          this.saveData(result.payload, i);
        } else {
          this.throw({
            body: 'Unable to read the packets of data from the device.',
            heading: `Device Misconfigured`,
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
    const wallet = await api('getWallet', { userId });
    if (isEmpty(wallet) || !wallet.balance) {
      this.setState({ desc: 'Wallet not funded', walletLoading: false });
    } else {
      this.setState({
        desc: 'IOTA wallet balance:',
        wallet,
        walletInit: true,
        walletLoading: false,
      });
    }
  };

  fund = async () => {
    this.setState({ desc: 'Funding wallet', walletLoading: true }, async () => {
      const wallet = await initWallet();
      await api('setWallet', { userId: this.state.uid, wallet });
      this.setState({
        walletInit: true,
        desc: 'IOTA wallet balance:',
        walletLoading: false,
        wallet,
        error: false,
      });
    });
  };

  purchase = async () => {
    const device = this.state.deviceInfo;
    // Make sure we have wallet
    const wallet = await api('getWallet', { userId: this.state.uid });
    if (isEmpty(wallet) || wallet.error)
      return this.throw(
        {
          body: ` Setup wallet by clicking the top right, to get a prefunded IOTA wallet.`,
          heading: `Wallet doesn't exist`,
        },
        false
      );
    if (Number(wallet.balance) < device.value)
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
          purchaseResp = await purchaseData(wallet.seed, device.address, device.value);
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
                params: { id },
              },
            } = this.props;
            const packet = {
              id: this.state.uid,
              device: id,
              full: true,
              hashes: purchaseResp.map(bundle => bundle.hash),
            };
            const message = await api('purchaseStream', packet);
            // Check Success
            if (message.success) {
              // Modify wallet balance
              wallet.balance = Number(wallet.balance) - device.value;
              // Start Fetching data
              this.fetch(this.state.uid);
              // Update wallet.
              await api('updateBalance', { userId: this.state.uid, balance: wallet.balance });

              return this.setState({
                loading: true,
                purchase: true,
                wallet,
              });
            } else {
              return this.throw({
                body: message.error,
                heading: `Purchase Failed`,
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
    return (
      <Main>
        <SensorNav {...this.state} fund={this.fund} />
        <Data>
          <Sidebar {...this.state} />
          <DataStream {...this.state} func={this.loadMore} />
        </Data>
        <Modal
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
