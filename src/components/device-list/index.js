import React from 'react';
import styled from 'styled-components';
import DeviceCard from '../card/device';
import AddCard from '../add-sensor';

export default props => (
  <InfoCol>
    <CardWrapper>
      {props.devices.map((device, i) => (
        <DeviceCard index={i} key={device.sensorId} device={device} delete={props.delete} />
      ))}
      {props.devices.length < props.maxDevices ? (
        <AddCard create={props.create} />
      ) : (
        <End>{`You can create up to ${props.maxDevices ||
          5} devices. Delete a device to add another.`}</End>
      )}
    </CardWrapper>
  </InfoCol>
);

const InfoCol = styled.main`
  position: relative;
  width: 880px;

  @media (max-width: 760px) {
    width: 100%;
    padding: 0;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 40px 40px 200px;
  @media (max-width: 1195px) {
    flex-flow: column nowrap;
    padding-bottom: 0;
  }
  @media (max-width: 760px) {
    width: 100%;
    align-items: center;
  }
`;

const End = styled.span`
  padding: 15px 0 50px;
  color: white;
  opacity: 0.4;
`;
