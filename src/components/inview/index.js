import React, { Component } from 'react';
import InView from 'in-view';

export default class extends Component {
  componentDidMount() {
    InView('.inview').on('enter', el => this.props.func());
  }

  render() {
    return <div className={'inview'}>{this.props.children}</div>;
  }
}
