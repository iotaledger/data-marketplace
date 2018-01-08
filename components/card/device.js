import React from 'react'
import styled, { css } from 'styled-components'
import { reducer, getBalance } from '../../lib/iota'
import { fbRef } from '../../lib/firebase'
import { format } from 'date-fns'

import Card from './index.js'

const Heading = (props, func) => (
  <Full>
    <SensorType>{props.type}</SensorType>
    <SensorId>
      {props.sensorId ? props.sensorId.substr(0, 20) + '...' : '--'}
    </SensorId>
    <Delete onClick={() => func(props.sensorId)}>
      <IconButton src="/static/icons/icon-delete.svg" />
    </Delete>
  </Full>
)
const Full = styled.div`
  width: 100%;
`
const Delete = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  top: 10px;
  right: 30px;
`
const IconButton = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.4;
  }
  /* margin-right: 5px; */
`

const Footer = props => (
  <div>
    {/* <FootRow>
      <InfoKey>Device Address:</InfoKey>
      <InfoValue>
        {'AJDJ9HAKF99JSMAK9IRJSAIEJSME'.substr(0, 11) + '...'}
      </InfoValue>
    </FootRow> */}
    <FootRow>
      <InfoKey>Data price:</InfoKey>
      <InfoValue>{reducer(props.value)}</InfoValue>
    </FootRow>
    <FootRow>
      <InfoKey>Device Key:</InfoKey>
      <InfoValue>{props.sk}</InfoValue>
    </FootRow>
  </div>
)

export default class extends React.Component {
  state = { loading: true, device: { location: {} } }
  componentDidMount() {
    this.setState(this.props)
  }
  render() {
    var { device, loading } = this.state
    return (
      <Card header={Heading(device, this.props.delete)} footer={Footer(device)}>
        <RowHalf>
          <RowIcon src="/static/icons/icon-small-location.svg" alt="" />
          <RowDesc>Location</RowDesc>
          <Data>
            {device.location.city
              ? device.location.city + ', ' + device.location.country
              : '--'}
          </Data>
        </RowHalf>
        <RowHalf>
          <RowIcon src="/static/icons/icon-small-packet.svg" alt="" />
          <RowDesc>Sensor streams:</RowDesc>
          <Data>{device.dataTypes && device.dataTypes.length}</Data>
        </RowHalf>
        {/* <RowHalf>
          <RowIcon src="/static/icons/icon-small-packet.svg" alt="" />
          <RowDesc>Stream Purchases:</RowDesc>
          <Data>{523}</Data>
        </RowHalf>
        <RowHalf>
          <RowIcon src="/static/icons/icon-small-packet.svg" alt="" />
          <RowDesc>Last Packet:</RowDesc>
          <Data>{'31 minutes ago'}</Data>
        </RowHalf> */}
      </Card>
    )
  }
}

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
`
const Data = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-top: 4px;
`
const RowDesc = styled.span`
  margin-left: 5px;
  font: 12px/16px 'Nunito Sans', sans-serif;
  color: #808b92;
`
const RowIcon = styled.img`
  position: relative;
  top: 1px;
`
const SensorIcon = styled.img`
  margin-right: 10px;
`
const CardFooter = styled.footer`
  padding: 20px 30px;
  background-color: rgba(206, 218, 226, 0.2);
  border-top: 1px solid #eaecee;
`
const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
`

const InfoKey = styled.span`
  color: #808b92;
  text-transform: capitalize;
  font: 12px/16px 'Nunito Sans', sans-serif;
`

const InfoValue = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
`
const CardIcon = styled.img`
  margin-right: 10px;
`
const SensorType = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
  position: absolute;
  top: -8px;
  color: #808b92;
`
const SensorId = styled.span`
  font-size: 24px;
  top: 6px;
  line-height: 42px;
  position: relative;
  color: #009fff;
`
