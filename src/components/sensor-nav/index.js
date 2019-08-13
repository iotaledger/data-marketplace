import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import Wallet from '../wallet';

const SensorNav = ({ history, sensor }) => (
  <Main>
    <Back to={'/'} onClick={history.goBack}>
      <img src="/static/icons/icon-arrow-back-dark.svg" alt="Icon arrow" />
    </Back>

    <Header>
      <Block>
        <Desc>{sensor && sensor.type ? sensor.type : 'Loading Device'}</Desc>
        <DeviceID>{sensor && sensor.sensorId}</DeviceID>
      </Block>
    </Header>
    <RightHeader>
      <Wallet />
    </RightHeader>
  </Main>
);

const mapStateToProps = state => ({ sensor: state.sensor });
export default connect(mapStateToProps)(withRouter(SensorNav));

const Main = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
  height: 100px;
  background-color: #fff;
  @media (max-width: 1195px) {
    height: 90px;
  }
  @media (max-width: 760px) {
    height: 66px;
  }
`;

const Header = styled.header`
  margin: 10px auto 0 30px;
  display: flex;
`;

const Back = styled(Link)`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 90px;
  cursor: pointer;
  border-right: 1px solid #eaecee;
  @media (max-width: 760px) {
    width: 46px;
    border: none;
  }
`;

const Desc = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
  color: #808b92;
`;

const DeviceID = styled.span`
  font-size: 24px;
  line-height: 42px;
  position: relative;
  top: -4px;
  color: #009fff;
  @media (max-width: 760px) {
    font-size: 15px;
    top: -4px;
  }
`;

const RightHeader = styled.div`
  margin: 5px 30px 0 30px;
  display: block;
  width: 250px;
  text-align: right;
  @media (max-width: 760px) {
    margin: 10px 20px 0 30px;
    width: 120px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
