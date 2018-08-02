import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  async componentDidMount() {
    const visible = await localStorage.getItem('cookie');
    this.setState({ visible });
  };

  render() {
    return <div visible={this.state.visible}>Cookie policy</div>;
  }
}
