import React from "react"
import styled from "styled-components"

import Header from "../components/header"
import Features from "../components/feature-section"

export default class extends React.Component {
  componentDidMount = async () => {}

  render() {
    return (
      <Main>
        <Header />
        <Features />
      </Main>
    )
  }
}

const Main = styled.div`overflow-x: hidden;`
