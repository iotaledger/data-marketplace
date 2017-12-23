import React from 'react'
import styled, { css } from 'styled-components'

export default item => (
  <Card data-component="SensorCard">
    <CardHeader>
      {/* <CardIcon
        src="/static/icons/icon-weather.svg"
        alt="Weather sensor icon"
      /> */}
      <SensorType>{item.type}</SensorType>
      <SensorId>
        {item.sensorId && item.sensorId.length > 20
          ? item.sensorId.substr(0, 20) + '...'
          : item.sensorId}
      </SensorId>
    </CardHeader>

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
    <CardFooter>
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
    </CardFooter>
  </Card>
)

const Card = styled.a`
  color: inherit;
  text-decoration: none;
  position: relative;
  padding-top: 20px;
  border: 1px solid #eaecee;
  border-radius: 6px;
  margin-bottom: 40px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.19s ease-out;
  @media (max-width: 1120px) {
    margin-bottom: 20px;
  }
  @media (max-width: 400px) {
    width: 280px;
  }
  &:hover {
    box-shadow: 0 23px 50px 0 rgba(25, 54, 80, 0.1);
  }
`
const CardHeader = styled.header`
  position: relative;
  padding: 0 30px 8px 30px;
  border-bottom: 1px solid #eaecee;
`
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
