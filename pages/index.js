import React from 'react'
import styled from 'styled-components'

import Header from '../components/header'
import Features from '../components/feature-section'
import Map from '../components/map'
import SensorList from '../components/sensor-list'
import Partners from '../components/partners'
import Benefits from '../components/benefits'
import Form from '../components/form'
import Footer from '../components/footer'
import Cookies from '../components/cookie'

import FB from '../lib/firebase'
import { allDevices } from '../lib/auth-user'

export default class extends React.Component {
  state = { devices: [] }
  componentDidMount = async () => {
    // Firebase
    const firebase = await FB()
    var devices = await allDevices(firebase)
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
        <Form />
        <Footer />
        <Cookies />
      </Main>
    )
  }
}

const Main = styled.div`
  overflow-x: hidden;
`
