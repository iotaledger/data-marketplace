import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transition: 0.3s all ease;
  background-image: linear-gradient(190deg, #f3f8fa 1%, #eaf0f4 95%);
`

export default class extends React.Component {
  state = { visible: false }

  componentDidMount = async () => {
    let visible = JSON.parse(await localStorage.getItem('cookie'))
    if (visible == null) {
      this.setState({ visible: true })
      setTimeout(() => {
        localStorage.setItem('cookie', JSON.stringify(true))
        this.setState({ visible: false })
      }, 15000)
    }
  }

  agree = () => {
    localStorage.setItem('cookie', JSON.stringify(true))
    this.setState({ visible: false })
  }
  render() {
    var { visible } = this.state
    return (
      <Box visible={visible}>
        {'This website collects cookies. To view our cookie policy click '}
        <a onClick={() => this.agree()}>here</a>
      </Box>
    )
  }
}
