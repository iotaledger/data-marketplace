import React from 'react';
import styled from 'styled-components';
import Loading from '../loading';

const Wallet = ({ desc, fund, walletLoading, wallet }) => (
  <Block>
    <Desc>{desc}</Desc>
    {walletLoading ? (
      <div style={{ margin: '8px 0 0 ' }}>
        <Loading size="26" color="#0d3497" />
      </div>
    ) : wallet.balance ? (
      <Balance>{wallet.balance.toLocaleString(navigator.language || {})} IOTA</Balance>
    ) : (
      <Button onClick={fund}>Fund Wallet</Button>
    )}
  </Block>
);

Wallet.defaultProps = {
  desc: 'Loading wallet',
  walletLoading: true,
};

export default Wallet;

const Desc = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
  color: #808b92;
`;

const Balance = styled.span`
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

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font: 15px 'Nunito Sans', sans-serif;
  letter-spacing: 0.47px;
  border-radius: 100px;
  text-transform: uppercase;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.38px;
  padding: 9px 10px;
  margin: 8px 0 0;
  box-shadow: 0 2px 10px 0 rgba(10, 32, 86, 0.3);
  font-weight: 700;
  background-color: #009fff;
  @media (max-width: 760px) {
    margin: 3px 0;
  }
`;
