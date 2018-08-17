import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import MiniHeader from '../components/header/mini-header';
import SensorList from '../components/sensor-list';
import Footer from '../components/footer';
import Map from '../components/map';
import { allDevices } from '../utils/firebase';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const devices = await allDevices(firebase);
    this.setState({ devices, loading: false });
  }

  render() {
    return (
      <Main>
        <MiniHeader />
        <Map {...this.state} />
        <SensorList {...this.state} />
        <Footer />
      </Main>
    );
  }
}

const Main = styled.div`
  overflow-x: hidden;
`;
