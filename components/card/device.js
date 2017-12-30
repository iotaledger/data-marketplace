import styled, { css } from 'styled-components'

import Card from './index.js'

const Heading = props => (
  <div>
    <SensorType>{props.type} Turtle Spawn</SensorType>
    <SensorId>
      Te-SAAKSA
      {props.sensorId && props.sensorId.length > 20
        ? [props].sensorId.substr(0, 20) + '...'
        : props.sensorId}
    </SensorId>
  </div>
)

const Footer = props => (
  <div>
    <FootRow>
      <InfoKey>Owner:</InfoKey>
      <InfoValue>{'Chuck Testa'}</InfoValue>
    </FootRow>
    {/* <FootRow>
        <InfoKey>Sensor streams collected:</InfoKey>
        <InfoValue>{item.dataTypes.length}</InfoValue>
      </FootRow> */}
    <FootRow>
      <InfoKey>Data price:</InfoKey>
      <InfoValue>{'2ki'}</InfoValue>
    </FootRow>
  </div>
)

export default props => (
  <Card header={Heading(props)} footer={Footer(props)}>
    <RowHalf>
      <RowIcon src="/static/icons/icon-small-location.svg" alt="" />
      <RowDesc>Location</RowDesc>
      <Data>{'Exmouth, WA'}</Data>
    </RowHalf>
    <RowHalf>
      <RowIcon src="/static/icons/icon-small-packet.svg" alt="" />
      <RowDesc>Sensor streams:</RowDesc>
      <Data>{7}</Data>
    </RowHalf>
  </Card>
)

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
