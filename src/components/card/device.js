import React from 'react';
import styled from 'styled-components';
import { getZip } from '../../utils/zip';
import Card from './index.js';

const Heading = ({ sensorId, type }, func) => (
  <Full>
    <SensorType>{type}</SensorType>
    {sensorId ? (
      <SensorId>{sensorId.length > 20 ? `${sensorId.substr(0, 20)}...` : sensorId}</SensorId>
    ) : null}
    <Delete onClick={() => func(sensorId)}>
      <IconButton src="/static/icons/icon-delete.svg" />
    </Delete>
  </Full>
);

const Footer = props => (
  <div onClick={() => getZip(props)}>
    <FootRow>
      <FooterButton>Download Publish Script</FooterButton>
    </FootRow>
  </div>
);

export default props => {
  const { device } = props;
  return (
    <Card header={Heading(device, props.delete)} footer={Footer(device)}>
      <RowHalf>
        <RowIcon src="/static/icons/icon-small-location.svg" alt="" />
        <RowDesc>Location</RowDesc>
        <Data>
          {device.location.city && device.location.country
            ? `${device.location.city}, ${device.location.country}`
            : '--'}
        </Data>
      </RowHalf>
      <RowHalf>
        <RowIcon src="/static/icons/icon-small-packet.svg" alt="" />
        <RowDesc>Sensor streams:</RowDesc>
        <Data>{device.dataTypes && device.dataTypes.length}</Data>
      </RowHalf>
    </Card>
  );
};

const RowHalf = styled.div`
  padding: 20px 30px 14px;
  display: inline-block;
  &:first-child {
    width: 180px;
    border-right: 1px solid #eaecee;
  }

  &:first-of-type {
    @media (max-width: 400px) {
      border: none;
      width: 140px;
      padding-left: 20px;
      padding-right: 0;
    }
  }
`;

const Data = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-top: 4px;
`;

const RowDesc = styled.span`
  margin-left: 5px;
  font: 12px/16px 'Nunito Sans', sans-serif;
  color: #808b92;
`;

const RowIcon = styled.img`
  position: relative;
  top: 1px;
`;

const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
`;

const SensorType = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
  position: absolute;
  top: -8px;
  color: #808b92;
`;

const SensorId = styled.span`
  font-size: 24px;
  top: 6px;
  line-height: 42px;
  position: relative;
  color: #009fff;
`;

const Full = styled.div`
  width: 100%;
`;

const Delete = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  top: 10px;
  right: 30px;
`;

const IconButton = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.4;
  }
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
