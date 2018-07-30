import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from './index';

const content = ({ device, purchase }) => (
  <Internal>
    <img
      src="/static/icons/icon-padlock.png"
      srcSet="/static/icons/icon-padlock@2x.png 2x"
      alt="Icon padlock"
    />
    <Heading>Purchase device stream</Heading>
    <Info>You can purchase access to this device's data stream by clicking below.</Info>
    <Button type="button" className="btn btn-accent txt-bold modal-trigger" onClick={purchase}>
      Purchase Access for {device && device.price} IOTA
    </Button>
  </Internal>
);

const error = ({ error, button }) => (
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

export default props => (
  <Card {...props} cardContent={content(props)} errorContent={error(props)} />
);

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
