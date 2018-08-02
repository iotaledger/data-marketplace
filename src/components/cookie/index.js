import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.agree = this.agree.bind(this);
  }

  async componentDidMount() {
    const visible = JSON.parse(await localStorage.getItem('cookie'));
    if (!visible) {
      this.setState({ visible: true });
      setTimeout(() => {
        localStorage.setItem('cookie', JSON.stringify(true));
        this.setState({ visible: false });
      }, 15000);
    }
  };

  agree() {
    localStorage.setItem('cookie', JSON.stringify(true));
    this.setState({ visible: false });
  };

  render() {
    return (
      <Box visible={this.state.visible}>
        {'This website collects cookies. To view our cookie policy click '}
        <Link to={'/cookies'} onClick={this.agree} target="_blank">
          here
        </Link>
      </Box>
    );
  }
}
