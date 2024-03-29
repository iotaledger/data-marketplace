import React from 'react';
import styled from 'styled-components';
import SensorCard from '../sensor-card';
import Inview from '../inview';
import Loading from '../loading';

const DataStream = ({ packets, newPacketsLength }) => (
  <InfoCol>
    <CardWrapper>
      {packets &&
        packets.sort((a, b) => b.time - a.time).map((packet, i) => <SensorCard index={i} key={i} packet={packet} />)}
      
    </CardWrapper>
    {packets.length > 0 && (
        <Fetcher>
          {newPacketsLength === 0 && <p>No new data to fetch. Scroll down to try again.</p>}
          <Inview />
          <Block />
        </Fetcher>
      )}
      {newPacketsLength > 0 && packets.length === 0 && <Loading color="#e2e2e2" size="80" />}
  </InfoCol>
);

export default DataStream;

const InfoCol = styled.main`
  position: relative;
  width: 880px;
  padding-left: 30px;
  @media (max-width: 760px) {
    width: 100%;
    padding: 0;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 455px;
    width: 1px;
    height: 100%;
    background-color: #738fd4;
    @media (max-width: 1195px) {
      left: 30px;
    }
    @media (max-width: 760px) {
      visibility: hidden;
    }
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 40px 0 200px;
  @media (max-width: 1195px) {
    flex-flow: column nowrap;
    padding-bottom: 0;
    margin-left: 30px;
  }
  @media (max-width: 760px) {
    width: 100%;
    margin-left: 0;
    align-items: center;
  }
`;

const Block = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 0;
`;

const Fetcher = styled.div`
  position: relative;
  bottom: 10px;
  color: white;
  padding: 20px 10px;
  margin: 10px 0 20px;
  @media (max-width: 760px) {
    position: relative;
  }
`;
