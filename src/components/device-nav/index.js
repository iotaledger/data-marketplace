import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const Back = styled.a`
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
// const NavGraphics = styled.img`
//   height: 100%;
//   width: auto;
//   @media (max-width: 760px) {
//     width: 66px;
//     object-fit: cover;
//   }
// `;

// const SensorIcon = styled.img`
//   margin-right: 10px;
//   @media (max-width: 760px) {
//     display: none;
//   }
// `;

export default props => (
  <Main>
    <Link to={`/#map`}>
      <Back>
        <img src="/static/icons/icon-arrow-back-dark.svg" alt="Icon arrow" />
      </Back>
    </Link>

    <Header>
      <Block>
        <Desc>
          Owner:
          {/* Google sign-in */}
          {/* {props.deviceInfo.type ? props.deviceInfo.type : 'Loading Device'} */}
        </Desc>
        <DeviceID>{props.user.displayName || '--'}</DeviceID>
      </Block>
    </Header>
    <RightHeader>
      {props.user && <FooterButton onClick={() => props.logout()}>{`Log Out`}</FooterButton>}
    </RightHeader>
  </Main>
);
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
