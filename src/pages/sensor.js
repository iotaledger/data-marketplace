import React from 'react';
import styled from 'styled-components';
import FB from '../lib/firebase';
import Mam from 'mam.client.js';
import { getData, deviceInfo, userAuth } from '../lib/auth-user';
import { iota, initWallet, purchaseData, getBalance } from '../lib/utils';
import SensorNav from '../components/sensor-nav';
import Modal from '../components/modal/purchase';
import Sidebar from '../components/side-bar';
import DataStream from '../components/data-stream';
import config from '../config.json';

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
    // Init Wallet
    this.fetchWallet();
    // Firebase
    const firebase = await FB();
    const store = firebase.firestore();
    const { uid } = await userAuth(firebase);
    const {
      match: {
        params: { id },
      },
    } = this.props;

    // Get data
    const userRef = store.collection('users').doc(uid);
    const deviceRef = store.collection('devices').doc(id);
    const device = await deviceInfo(deviceRef, this.props.id);

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
      userRef,
      deviceRef,
      deviceInfo: device,
      layout,
      uid,
    });
    // MAM
    this.fetch(deviceRef, userRef);
  }

  throw = (error, button) => {
    this.setState({
      loading: false,
      error,
      button,
    });
  };

  fetch = async (deviceRef, userRef) => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    let data = await getData(deviceRef, userRef, id);
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

  fetchWallet = async () => {
    const wallet = JSON.parse(await localStorage.getItem('wallet'));
    if (!wallet) {
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
      await localStorage.setItem('wallet', JSON.stringify(wallet));
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
    let wallet = JSON.parse(await localStorage.getItem('wallet'));
    if (!wallet)
      return this.throw(
        {
          body: ` Setup wallet by clicking the top right, to get a prefunded IOTA wallet.`,
          heading: `Wallet doesn't exist`,
        },
        false
      );
    if (wallet.balance < device.value)
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
            heading: `Purchase Failed`,
          });
        }
        this.setState(
          {
            loading: {
              heading: `Success!`,
              body: `Your purchase was successfully. Fetching MAM stream and decoding data.`,
            },
          },
          async () => {
            const packet = {
              id: this.state.uid,
              device: this.props.id,
              full: true,
              hashes: purchaseResp.map(bundle => bundle.hash),
            };
            const resp = await fetch(
              `https://${config.api}.marketplace.tangle.works/purchaseStream`,
              {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(packet),
              }
            );
            const message = await resp.json();
            // Check Success
            if (message.success) {
              // Modify wallet balance
              wallet.balance = wallet.balance - device.value;
              // Start Fetching data
              this.fetch(this.state.deviceRef, this.state.userRef);
              // Update wallet.
              await localStorage.setItem('wallet', JSON.stringify(wallet));
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
