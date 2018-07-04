import React from 'react'
import styled from 'styled-components'

export default class extends React.Component {
  state = { visible: false }

  componentDidMount = async () => {
    let visible = await localStorage.getItem('cookie')
    this.setState({ visible })
    console.log(visible)
  }
  render() {
    var { visible } = this.state
    return <Main visible>Hellooo</Main>
  }
}

const Main = styled.div``
