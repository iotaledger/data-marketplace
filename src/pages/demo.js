import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import Header from '../components/header';
import SensorList from '../components/sensor-list';
import Footer from '../components/footer';
import Map from '../components/map';
import { allDevices } from '../utils/firebase';

const links = [
  { link: 'home', text: 'Data Marketplace Home' },
  { link: 'specs', text: 'Proof of Concept - Technical specifications' },
  { link: 'business', text: 'Co-creation ecosystem - Exploring together new business models' },
  { link: 'involved', text: 'Get involved' }
];

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
  };

  render() {
    return (
      <Main>
        <Header links={links} />
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
