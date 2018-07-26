import React from 'react';
import styled from 'styled-components';
// import dynamic from 'next/dynamic';

import Header from '../components/header';
import Features from '../components/feature-section';
import SensorList from '../components/sensor-list';
import Partners from '../components/partners';
import Benefits from '../components/benefits';
import Form from '../components/form';
import Footer from '../components/footer';
import Map from '../components/map';

import FB from '../utils/firebase';
import { allDevices } from '../utils/auth-user';

// const Map = dynamic(import('../components/map'), {
//   ssr: false,
// });

export default class extends React.Component {
  state = {
    devices: [],
    loading: true,
    anchor: null,
  };

  componentDidMount = async () => {
    // Firebase
    const firebase = await FB();
    const devices = await allDevices(firebase);
    this.setState({ devices, loading: false });
  };

  onAnchorClick = anchor => this.setState({ anchor });

  render() {
    return (
      <Main>
        <Header onAnchorClick={this.onAnchorClick} />
        <Features />
        <Map {...this.state} />
        <SensorList {...this.state} />
        <Partners {...this.state} />
        <Benefits />
        <Form {...this.state} />
        <Footer />
      </Main>
    );
  }
}

const Main = styled.div`
  overflow-x: hidden;
`;
