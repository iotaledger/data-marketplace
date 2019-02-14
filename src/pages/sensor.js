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
import SensorNav from '../components/sensor-nav';
import Modal from '../components/modal';
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
      packets: [],
      lastFetchedTimestamp: null,
      notification: 'loading',
      error: false,
      fetching: false,
      purchase: false,
    };

    this.loadMore = this.loadMore.bind(this);
    this.purchase = this.purchase.bind(this);
    this.purchaseData = this.purchaseData.bind(this);
    this.purchaseStream = this.purchaseStream.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  async componentDidMount() {
    ReactGA.pageview('/sensor');
    const userId = (await userAuth()).uid;
    const { loadSensor, sensor, match: { params: { deviceId } }, settings: { provider } } = this.props;

    await loadSensor(deviceId);

    if (typeof sensor === 'string') {
      return this.setNotification('noDevice');
    }

    this.ctx = await createContext();
    this.client = createHttpClient({ provider });

    this.setState({ userId, fetching: true });
  }

  loadMore() {
    if (this.state.packets[0] && !this.state.fetching) {
      this.setFetching(true);
    }
  }

  async purchase() {
    const { loadUser, user, sensor } = this.props;

    if (!user) {
      await loadUser(this.state.userId);
    }

    // Make sure we have wallet
    const wallet = user.wallet;
    if (!wallet || isEmpty(wallet) || wallet.error) {
      return this.setNotification('noWallet');
    }
    if (Number(wallet.balance) < Number(sensor.price)) {
      return this.setNotification('noBalance');
    }

    this.setNotification('purchasing');
    await this.purchaseData();

    ReactGA.event({
      category: 'Purchase stream',
      action: 'Purchase stream',
      label: `Sensor ID ${sensor.sensorId}`
    });
  }

  async purchaseData() {
    const { sensor } = this.props;

    // Try purchase
    try {
      const purchaseDataPacket = {
        userId: this.state.userId,
        address: sensor.address,
        value: Number(sensor.price),
      };

      const purchaseDataResult = await api('purchaseData', purchaseDataPacket);
      if (purchaseDataResult && purchaseDataResult.transactions) {
        this.setNotification('fetching');
        await this.purchaseStream(purchaseDataResult.transactions);
      }
    } catch (error) {
      console.error('purchase error', error);
      return this.setNotification('purchaseFailed', error.message);
    }
  }

  async purchaseStream(purchaseData) {
    const { userId } = this.state;
    const { loadUser, match: { params: { deviceId } } } = this.props;

    // Update wallet balance
    const balanceUpdateResponse = await api('updateBalance', { userId, deviceId });
    await loadUser(userId);

    if (balanceUpdateResponse.success) {
      const hashes = purchaseData && purchaseData.map(bundle => bundle.hash);
      const packet = { userId, deviceId, hashes };
      const message = await api('purchaseStream', packet);

      if (message.success) {
        return this.setState({
          purchase: true,
          fetching: true // Start Fetching data
        });
      } else {
        ReactGA.event({
          category: 'Purchase failed',
          action: 'purchaseStream',
          label: `User ID ${userId}, sensor ID ${deviceId}`
        });
        return this.setNotification('purchaseFailed', message.error);
      }
    } else {
      return this.setNotification('purchaseFailed', balanceUpdateResponse.error); 
    }
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

  setNotification = (notification, error) => this.setState({ notification, error });
  setFetching = flag => this.setState({ fetching: flag });
  setPurchase = flag => this.setState({ purchase: flag });
  setErrorState = flag => this.setState({ error: flag });
  setStreamLength = value => this.setState({ streamLength: value });
  setDataEnd = flag => this.setState({ dataEnd: flag });

  render() {
    const { userId, error, fetching, packets, streamLength } = this.state;
    const { match: { params: { deviceId } } } = this.props;

    return (
      <Main>
        <Cookie />
        <SensorContext.Provider value={{ userId, setErrorState: this.setErrorState, setNotification: this.setNotification }}>
          <SensorNav />
        </SensorContext.Provider>
        <Data>
          <Sidebar isLoading={fetching && packets[0] && !this.state.dataEnd && packets.length !== streamLength} />
          <SensorContext.Provider value={{ func: this.loadMore }}>
            <DataStream packets={packets} streamLength={streamLength} />
          </SensorContext.Provider>
        </Data>
        <Modal
          purchasePrice={this.props.sensor.price}
          callback={this.purchase}
          show={!this.state.purchase || !isEmpty(error)}
          notification={this.state.notification}
          error={error}
        />
        {
          fetching && (
            <Fetcher
              setNotification={this.setNotification}
              setPurchase={this.setPurchase}
              setStreamLength={this.setStreamLength}
              setFetching={this.setFetching}
              setDataEnd={this.setDataEnd} 
              saveData={this.saveData} 
              lastFetchedTimestamp={this.state.lastFetchedTimestamp}
              deviceId={deviceId}
              userId={userId} 
              packets={packets.length}
              ctx={this.ctx}
              client={this.client}
            />
          )
        }
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
