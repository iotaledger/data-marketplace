import React from 'react'
import styled from 'styled-components'

import Header from '../components/header'
import Features from '../components/feature-section'
import Map from '../components/map'
import SensorList from '../components/sensor-list'
import Partners from '../components/partners'
import Benefits from '../components/benefits'
import Footer from '../components/footer'

import FB, { allDevices } from '../lib/db'

export default class extends React.Component {
  state = { devices: [] }
  componentDidMount = async () => {
    // Firebase
    const firebase = await FB()
    var devices = await allDevices(firebase.firestore)
    console.log(devices)
    this.setState({ devices })
  }
  render() {
    return (
      <Main>
        <Header />
        <Features />
        <Map {...this.state} />
        <SensorList {...this.state} />
        <Partners />
        <Benefits />
        <Footer />
      </Main>
    )
  }
}

const Main = styled.div`overflow-x: hidden;`
