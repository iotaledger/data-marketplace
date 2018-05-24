import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

import Header from "../components/header";
import Features from "../components/feature-section";
import SensorList from "../components/sensor-list";
import Partners from "../components/partners";
import Benefits from "../components/benefits";
import Form from "../components/form";
import Footer from "../components/footer";
import Cookies from "../components/cookie";

const Map = dynamic(import("../components/map"), {
  ssr: false
});

import FB from "../lib/firebase";
import { allDevices } from "../lib/auth-user";

export default class extends React.Component {
  state = { devices: [], loading: true };
  componentDidMount = async () => {
    // Firebase
    const firebase = await FB();
    var devices = await allDevices(firebase);
    this.setState({ devices, loading: false });
  };
  render() {
    return (
      <Main>
        <Header />
        <Features />
        <Map {...this.state} />
        <SensorList {...this.state} />
        <Partners />
        <Benefits />
        {/* <Form {...this.state} /> */}
        <Footer />
        {/* <Cookies /> */}
      </Main>
    );
  }
}

const Main = styled.div`
  overflow-x: hidden;
`;
