import React from "react"
import styled from "styled-components"

import Header from "../components/header"

export default class extends React.Component {
  componentDidMount = async () => {}

  render() {
    return (
      <Main>
        <Header />
      </Main>
    )
  }
}

const Main = styled.div`overflow-x: hidden;`
