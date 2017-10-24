import React from 'react'
import styled from 'styled-components'

import Header from '../components/header'
import Features from '../components/feature-section'
import Map from '../components/map'
import SensorList from '../components/sensor-list'
import Partners from '../components/partners'
import Benefits from '../components/benefits'
import Footer from '../components/footer'

export default class extends React.Component {
  componentDidMount = async () => {}

  render() {
    return (
      <Main>
        <Header />
        <Features />
        <Map />
        <SensorList />
        <Partners />
        <Benefits />
        <Footer />
      </Main>
    )
  }
}

const Main = styled.div`overflow-x: hidden;`
