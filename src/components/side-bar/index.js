import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import isEmpty from 'lodash-es/isEmpty';
import { reducer } from '../../utils/helpers';
import Loading from '../loading';

const SideBar = ({ sensor, settings, isLoading }) => (
  <Sidebar>
    <Details>
      <Label>Sensor details:</Label>
      <div>
        {!isEmpty(settings) ? (
          <a
            href={`${settings.tangleExplorer}/${sensor.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DetailRow>
              <DetailKey>Device Balance:</DetailKey>
              <DetailValue>{sensor.balance ? reducer(sensor.balance) : '--'}</DetailValue>
            </DetailRow>
          </a>
        ) : (
          <DetailRow>
            <DetailKey>Device Balance:</DetailKey>
            <DetailValue>{sensor.balance ? reducer(sensor.balance) : '--'}</DetailValue>
          </DetailRow>
        )}
        <DetailRow>
          <DetailKey>Location:</DetailKey>
          <DetailValue>
            {' '}
            {sensor.location && sensor.location.city && sensor.location.country
              ? `${sensor.location.city}, ${sensor.location.country}`
              : '--'}
          </DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailKey>Owner:</DetailKey>
          <DetailValue>{sensor.company ? sensor.company : '--'}</DetailValue>
        </DetailRow>
      </div>
    </Details>
    <Fetcher>
      {isLoading ? <Loading /> : null}
    </Fetcher>
  </Sidebar>
);

const mapStateToProps = state => ({
  settings: state.settings,
  sensor: state.sensor,
});

export default connect(mapStateToProps)(SideBar);

const Fetcher = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  justify-content: center;
  @media (max-width: 760px) {
    display: none;
  }
`;

const Sidebar = styled.aside`
  background-image: linear-gradient(-189deg, #0d3497 1%, #1857eb 95%);
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  width: 25vw;
  min-width: 330px;
  padding: 40px 30px 0 0;
  @media (max-width: 1235px) {
    width: 10vw;
    min-width: 290px;
  }
  @media (max-width: 760px) {
    width: 100%;
    padding: 30px 15px;
  }
`;

const Details = styled.div`
  width: 230px;
  position: relative;
  padding-bottom: 30px;
  margin-bottom: 30px;
  @media (max-width: 760px) {
    width: 100%;
  }
  &::before {
    content: '';
    position: absolute;
    right: -30px;
    bottom: 0;
    height: 1px;
    width: 100vw;
    background-color: rgba(115, 143, 212, 0.15);
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.41px;
  position: relative;
  display: block;
  margin: 0 0 30px;
  cursor: pointer;
  text-transform: uppercase;
  color: #009fff;
`;

const DetailRow = styled.div`
  @media (max-width: 760px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const DetailKey = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: #738fd4;
`;

const DetailValue = styled.p`
  font-size: 16px;
  line-height: 32px;
  color: #fff;
`;
