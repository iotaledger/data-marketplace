import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from './index';

const content = (state, change, submit) => (
  <Internal>
    <Heading>Grandfather Old Device</Heading>
    <Info>Enter you device's ID and Secret Key (Used in the publish script).</Info>
    <Input
      type="text"
      placeholder="Enter Device ID"
      value={state.id}
      name="id"
      onChange={e => change(e)}
    />
    <Input
      type="text"
      placeholder="Enter Secret Key"
      value={state.sk}
      name="sk"
      onChange={e => change(e)}
    />
    <Button type="button" className="btn btn-accent txt-bold modal-trigger" onClick={submit}>
      Load Device
    </Button>
  </Internal>
);

const error = ({ button, error }) => (
  <Internal>
    <Heading>{error.heading}</Heading>
    <Info>{error.body}</Info>
    {button && (
      <Link to={'/'}>
        <Button type="button" className="btn btn-accent txt-bold modal-trigger">
          Go back
        </Button>
      </Link>
    )}
  </Internal>
);

export default class extends Component {
  state = { id: '', sk: '' };

  change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = () => {
    this.props.grandfather(this.state.id, this.state.sk);
  };

  render() {
    return (
      <Card
        {...this.props}
        cardContent={content(this.state, this.change, this.submit)}
        errorContent={error(this.props)}
      />
    );
  }
}

const Heading = styled.p`
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  text-align: center;
  color: #009fff;
`;

const Info = styled.p`
  font-size: 17px;
  line-height: 28px;
  color: #fff;
  text-align: center;
  margin-bottom: auto;
`;

const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font: 15px 'Nunito Sans', sans-serif;
  letter-spacing: 0.47px;
  padding: 20px 38px;
  border-radius: 100px;
  text-transform: uppercase;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.38px;
  padding: 12px 21px;
  margin: 15px 0 0;
  box-shadow: 0 10px 20px 0 #0a2056;
  font-weight: 700;
  background-color: #009fff;
`;

const Internal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  padding: 4px 10px;
  color: white;
  &:placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`;
