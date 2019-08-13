import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash-es/isEmpty';
import { Link, withRouter } from 'react-router-dom';

const DeviceNav = ({ history, logout, user }) => (
  <Main>
    <Back to={'/'} onClick={history.goBack}>
      <img src="/static/icons/icon-arrow-back-dark.svg" alt="Icon arrow" />
    </Back>

    <Header>
      <Block>
        <Desc>Owner:</Desc>
        <DeviceID>{user.displayName || '--'}</DeviceID>
      </Block>
    </Header>
    <RightHeader>
      {
        !isEmpty(user) && <FooterButton onClick={logout}>Log Out</FooterButton>
      }
    </RightHeader>
  </Main>
);

export default withRouter(DeviceNav);

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
  width: 150px;
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

const FooterButton = styled.button`
  color: ${props => (props.grey ? `rgba(41, 41, 41, 0.4)` : `rgba(41, 41, 41, 0.9)`)};
  padding: 5px 15px;
  margin-right: -15px;
  font-size: 90%;
  background: transparent;
  &:first-of-type {
    margin-left: -15px;
    margin-right: 0;
  }
`;
