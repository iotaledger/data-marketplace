import React, { useContext, useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import styled from 'styled-components';
import isEmpty from 'lodash-es/isEmpty';
import Loading from '../loading';
import { loadUser } from '../../store/user/actions';
import { SensorContext } from '../../pages/sensor';
import api from '../../utils/api';

const Wallet = ({ loadUser, sensor, wallet }) => {
  const { userId, setErrorState, setNotification } = useContext(SensorContext);
  const [desc, setDesc] = useState('Loading wallet');
  const [walletLoading, setWalletLoading] = useState(false);

  useEffect(() => { fetchWallet() }, [wallet && wallet.balance]);
  useEffect(() => { loadUser(userId) }, [userId]);

  async function fetchWallet() {
    if (isEmpty(wallet) || !wallet.balance) {
      setDesc('Wallet not funded');
      setWalletLoading(false);
    } else {
      setDesc('IOTA wallet balance:');
      setWalletLoading(false);
      setErrorState(false);
      setNotification('purchase');
    }
  }

  async function fund() {
    ReactGA.event({
      category: 'Fund wallet',
      action: 'Fund wallet',
      label: `Sensor ID ${sensor.sensorId}`
    });

    setDesc('Funding wallet');
    setWalletLoading(true);

    await api.post('wallet', { userId });
    await loadUser(userId);
  }

  return (
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
  )
}

const mapStateToProps = state => ({
  sensor: state.sensor,
  wallet: (state.user && state.user.wallet) || {}
});

const mapDispatchToProps = dispatch => ({
  loadUser: userId => dispatch(loadUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);


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
