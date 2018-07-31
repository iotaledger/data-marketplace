import React, { Component } from 'react';

export default class extends Component {
  state = { visible: false };

  componentDidMount = async () => {
    const visible = await localStorage.getItem('cookie');
    this.setState({ visible });
  };

  render() {
    return <div visible={this.state.visible}>Cookie policy</div>;
  }
}
