import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import isEmpty from 'lodash-es/isEmpty';
import { connect } from 'react-redux';
import { loadUser } from '../store/user/actions';
import { loadSensor } from '../store/sensor/actions';
import { userAuth } from '../utils/firebase';
import { getSensorStreamJSON } from '../utils/helpers';
import { purchaseStream } from '../utils/iota';
import SensorNav from '../components/sensor-nav';
import Modal from '../components/modal';
import Sidebar from '../components/side-bar';
import DataStream from '../components/data-stream';
import Fetcher from '../components/fetcher';
import Cookie from '../components/cookie';

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

    this.downloadSensorStreamJSON = this.downloadSensorStreamJSON.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.purchase = this.purchase.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  async componentDidMount() {
    ReactGA.pageview('/sensor');
    const userId = (await userAuth()).uid;
    const { match: { params: { deviceId } }} = this.props;
    await this.props.loadSensor(deviceId);

    if (typeof this.props.sensor === 'string') {
      ReactGA.event({
        category: 'Purchase failure, No device',
        action: 'Purchase failure, No device',
        label: `Sensor ID ${deviceId}`
      });
      return this.setNotification('noDevice');
    }
    this.setState({ userId, fetching: true });
  }

  async downloadSensorStreamJSON() {
    const { match: { params: { deviceId } } } = this.props;
    getSensorStreamJSON(deviceId, this.state.packets);
  }

  loadMore() {
    if (this.state.packets[0] && !this.state.fetching) {
      this.setFetching(true);
    }
  }

  async purchase() {
    const { loadUser, user, sensor, match: { params: { deviceId } }, settings } = this.props;
    const { userId } = this.state;

    if (!user) {
      await loadUser(userId);
    }

    // Make sure we have wallet
    const wallet = user.wallet;
    if (!wallet || isEmpty(wallet) || wallet.error) {
      return this.setNotification('noWallet');
    } 
    if ((Number(wallet.balance) - settings.dustProtectionThreshold) < Number(sensor.price)) {
      ReactGA.event({
        category: 'Purchase failure, No balance',
        action: 'Purchase failure, No balance',
        label: `User ID ${userId}`
      });
      return this.setNotification('noBalance');
    }

    ReactGA.event({
      category: 'Purchase stream',
      action: 'Purchase stream',
      label: `Sensor ID ${deviceId}`
    });

    this.setNotification('purchasing');
    purchaseStream(userId, deviceId)
      .then(async () => {
        await loadUser(userId);
        // Start Fetching data
        this.setState({ purchase: true, fetching: true });
      })
      .catch(error => {
        ReactGA.event({
          category: 'Purchase failure, purchase stream',
          action: 'Purchase failure, purchase stream',
          label: `Sensor ID ${deviceId}, user ID ${userId}, error: ${error}`
        });
        console.error('Purchase error', error)
        this.setNotification('purchaseFailed', error);
      });
  }

  saveData(packets) {
    const oldPackets = this.state.packets;
    const time = packets[packets.length - 1].time
    const lastFetchedTimestamp = !this.state.lastFetchedTimestamp || time < this.state.lastFetchedTimestamp ? time : this.state.lastFetchedTimestamp;
    this.setState({
      lastFetchedTimestamp,
      packets: [...oldPackets, ...packets]
    });
  }

  setNotification = (notification, error) => {
    this.setState({ notification, error })
  };
  setFetching = flag => this.setState({ fetching: flag });
  setPurchase = flag => this.setState({ purchase: flag });
  setErrorState = flag => this.setState({ error: flag });
  setNewPacketsLength = value => this.setState({ newPacketsLength: value });
  setDataEnd = flag => this.setState({ dataEnd: flag });

  render() {
    const { userId, error, fetching, packets, newPacketsLength, purchase } = this.state;
    const { match: { params: { deviceId } } } = this.props;

    return (
      <Main>
        <Cookie />
        <SensorContext.Provider value={{ userId, setErrorState: this.setErrorState, setNotification: this.setNotification, notification: this.state.notification }}>
          <SensorNav />
        </SensorContext.Provider>
        <Data>
          <Sidebar
            downloadSensorStreamJSON={this.downloadSensorStreamJSON}
            isLoading={fetching && packets[0]}
            purchase={purchase && packets.length > 0}
          />
          <SensorContext.Provider value={{ func: this.loadMore }}>
            <DataStream packets={packets} newPacketsLength={newPacketsLength} />
          </SensorContext.Provider>
        </Data>

        {
          (!this.state.purchase || !isEmpty(error)) && (
            <Modal
              purchasePrice={this.props.sensor.price}
              callback={this.purchase}
              show={!this.state.purchase || !isEmpty(error)}
              notification={this.state.notification}
              error={error}
            />)
        }
        {
          fetching && (
            <Fetcher
              setNotification={this.setNotification}
              setPurchase={this.setPurchase}
              setStreamLength={this.setNewPacketsLength}
              setFetching={this.setFetching}
              setDataEnd={this.setDataEnd}
              saveData={this.saveData}
              lastFetchedTimestamp={this.state.lastFetchedTimestamp}
              deviceId={deviceId}
              userId={userId}
              packets={packets.length}
            />
          )
        }
      </Main>
    );
  }
}

const mapStateToProps = state => ({
  sensor: state.sensor,
  user: state.user,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  loadSensor: deviceId => dispatch(loadSensor(deviceId)),
  loadUser: userId => dispatch(loadUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sensor);


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
