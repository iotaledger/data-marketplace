import React from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { createHttpClient } from '@iota/http-client';
import styled from 'styled-components';
import { createContext } from 'mam.client.js/lib/mam';
import isEmpty from 'lodash-es/isEmpty';
import { loadUser } from '../store/user/actions';
import { loadSensor } from '../store/sensor/actions';
import { userAuth } from '../utils/firebase';
import { getData } from '../utils/iota';
import SensorNav from '../components/sensor-nav';
import Modal from '../components/modal/purchase';
import Sidebar from '../components/side-bar';
import DataStream from '../components/data-stream';
import Fetcher from '../components/fetcher';
import Cookie from '../components/cookie';
import api from '../utils/api';

export const SensorContext = React.createContext({});

class Sensor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firebaseData: [],
      packets: [],
      purchase: false,
      button: true,
      lastFetchedTimestamp: null,
      loading: {
        heading: 'Loading Device',
        body: 'Fetching device information and your purchase history.',
      },
      error: false,
      fetching: false,
    };

    this.fetch = this.fetch.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.purchase = this.purchase.bind(this);
    this.purchaseData = this.purchaseData.bind(this);
    this.purchaseStream = this.purchaseStream.bind(this);
    this.saveData = this.saveData.bind(this);
    this.throw = this.throw.bind(this);
  }

  async componentDidMount() {
    ReactGA.pageview('/sensor');
    const userId = (await userAuth()).uid;
    const { loadSensor, sensor, match: { params: { deviceId } }, settings: { provider } } = this.props;

    await loadSensor(deviceId);

    if (typeof sensor === 'string') {
      return this.throw({
        body: `The device you are looking for doesn't exist, check the device ID and try again`,
        heading: `Device doesn't exist`,
      });
    }

    this.ctx = await createContext();
    this.client = createHttpClient({ provider });

    this.setState({ userId });
    this.fetch();
  }

  throw(error, button) {
    this.setState({ loading: false, error, button });
  }

  async fetch() {
    const { match: { params: { deviceId } } } = this.props;
    const { lastFetchedTimestamp, userId, firebaseData } = this.state;

    const data = await getData(userId, deviceId, lastFetchedTimestamp);

    if (typeof data === 'string' && data === 'Please purchase the stream') {
      return this.setState({ loading: false, purchase: false });
    }

    if (!firebaseData.length && (!data.length || !data[0])) {
      return this.throw({
        body: 'No data found',
        heading: 'Stream Read Failure',
      });
    }
    this.setState({ firebaseData: data, purchase: true, streamLength: this.state.packets.length + data.length, loading: false });
  }

  saveData(packet, time) {
    const packets = [...this.state.packets, packet];
    const lastFetchedTimestamp = !this.state.lastFetchedTimestamp || time < this.state.lastFetchedTimestamp ? time : this.state.lastFetchedTimestamp;
    this.setState({
      lastFetchedTimestamp,
      packets,
      purchase: true,
      fetching: false
    });
  }

  async purchase() {
    const { userId } = this.state;
    const { loadUser, user, sensor } = this.props;

    if (!user) {
      await loadUser(userId);
    }

    // Make sure we have wallet
    const wallet = user.wallet;
    if (!wallet || isEmpty(wallet) || wallet.error) {
      return this.throw({
        body: 'Setup wallet by clicking the top right, to get a prefunded IOTA wallet.',
        heading: 'Wallet does not exist',
      }, false);
    }
    if (Number(wallet.balance) < Number(sensor.price)) {
      return this.throw({
        body: 'You have run out of IOTA',
        heading: 'Not enough Balance',
      });
    }

    ReactGA.event({
      category: 'Purchase stream',
      action: 'Purchase stream',
      label: `Sensor ID ${sensor.sensorId}`
    });

    this.setState(
      {
        loading: {
          heading: 'Purchasing Stream',
          body: 'You are doing Proof of Work to attach this purchase to the network.',
        },
      },
      async () => {
        await this.purchaseData();
      }
    );
  }

  async purchaseData() {
    const { userId } = this.state;
    const { sensor } = this.props;

    // Try purchase
    try {
      const purchaseDataPacket = {
        userId,
        address: sensor.address,
        value: Number(sensor.price),
      };

      const purchaseDataResult = await api('purchaseData', purchaseDataPacket);
      if (purchaseDataResult && purchaseDataResult.transactions) {
        this.setState(
          {
            loading: {
              heading: 'Success!',
              body: 'Your purchase was successful. Fetching MAM stream and decoding data.',
            },
          },
          async () => {
            await this.purchaseStream(purchaseDataResult.transactions);
          }
        );
      }
    } catch (error) {
      console.error('purchase error', error);
      return this.throw({
        body: error.message,
        heading: 'Purchase Failed',
      });
    }
  }

  async purchaseStream(purchaseData) {
    const { userId } = this.state;
    const { loadUser, match: { params: { deviceId } } } = this.props;
    const packet = {
      userId,
      deviceId,
      full: true,
      hashes: purchaseData && purchaseData.map(bundle => bundle.hash),
    };

    const balanceUpdateResponse = await api('updateBalance', { userId, deviceId });
    await loadUser(userId);

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
        ReactGA.event({
          category: 'Purchase failed',
          action: 'purchaseStream',
          label: `User ID ${userId}, sensor ID ${deviceId}`
        });
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

  loadMore() {
    if (this.state.packets[0] && !this.state.fetching) {
      this.setState({ fetching: true }, () => {
        this.fetch();
      });
    }
  }

  resetErrorState = () => this.setState({ error: false });

  render() {
    const { userId, firebaseData, purchase, loading, error, button, fetching, packets, dataEnd, streamLength } = this.state;
    const { sensor } = this.props;
    return (
      <Main>
        <Cookie />
        <SensorContext.Provider value={{ userId, resetErrorState: this.resetErrorState }}>
          <SensorNav />
        </SensorContext.Provider>
        <Data>
          <Sidebar isLoading={fetching && packets[0] && !dataEnd && packets.length !== streamLength} />
          <SensorContext.Provider value={{ func: this.loadMore }}>
            <DataStream packets={packets} streamLength={streamLength} />
          </SensorContext.Provider>
        </Data>
        <Modal
          device={sensor}
          button={button}
          purchase={this.purchase}
          show={!purchase || !isEmpty(error)}
          loading={loading}
          error={error}
        />
        <SensorContext.Provider value={{ throwError: this.throw, ctx: this.ctx, client: this.client, dataEnd: () => this.setState({ dataEnd: true }) }}>
          <Fetcher data={firebaseData} saveData={this.saveData} />
        </SensorContext.Provider>
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  sensor: state.sensor,
  settings: state.settings,
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
