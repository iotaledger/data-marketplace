import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import Header from '../components/header/old';
import Features from '../components/feature-section/old';
import SensorList from '../components/sensor-list';
import Partners from '../components/partners/old';
import Benefits from '../components/benefits/old';
import Footer from '../components/footer/old';
import Map from '../components/map';
import Cookie from '../components/cookie';
import { allDevices } from '../utils/firebase';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      loading: true,
      anchor: null,
    };

    this.onAnchorClick = this.onAnchorClick.bind(this);
  }

  async componentDidMount() {
    ReactGA.pageview('/home_old');
    const devices = await allDevices();
    this.setState({ devices, loading: false });
  };

  onAnchorClick(anchor) {
    this.setState({ anchor });
  }

  render() {
    return (
      <Main>
        <Cookie />
        <Header onAnchorClick={this.onAnchorClick} />
        <Features />
        <Map {...this.state} />
        <SensorList {...this.state} />
        <Partners {...this.state} />
        <Benefits />
        <Footer />
      </Main>
    );
  }
}

const Main = styled.div`
  overflow-x: hidden;
`;
