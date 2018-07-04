import React from 'react';

export default class extends React.Component {
  state = { visible: false };

  componentDidMount = async () => {
    const visible = await localStorage.getItem('cookie');
    this.setState({ visible });
  };

  render() {
    const { visible } = this.state;
    return <div visible={visible}>Hellooo</div>;
  }
}
