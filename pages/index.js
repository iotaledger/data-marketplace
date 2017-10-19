import React from "react"
import styled from "styled-components"

import Header from "../components/header"
import Features from "../components/feature-section"
import Map from "../components/map"
import SensorList from "../components/sensor-list"

export default class extends React.Component {
  componentDidMount = async () => {}

  render() {
    return (
      <Main>
        <Header />
        <Features />
        <Map />
        <SensorList />
      </Main>
    )
  }
}

const Main = styled.div`overflow-x: hidden;`
