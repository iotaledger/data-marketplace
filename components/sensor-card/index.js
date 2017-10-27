import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

export default props => (
  <SensorCard>
    <CardHeader>
      <HeaderRow>
        <HeaderAccent>{format(props.packet.time, 'dddd')}</HeaderAccent>{' '}
        {format(props.packet.time, 'DD MMMM, YYYY H:mm a ')}
      </HeaderRow>
    </CardHeader>
    {props.layout.map((row, i) => (
      <Row key={`sensor-${i}`}>
        {row.map((item, i) => (
          <RowHalf key={`item-${i}`}>
            <RowDesc>{item.name}:</RowDesc>
            <RowValue>
              {(props.packet && props.packet.data[item.id.toLowerCase()]) ||
                '--'}
              <RowUnit>{item.unit}</RowUnit>
            </RowValue>
          </RowHalf>
        ))}
      </Row>
    ))}

    {/* <Row>
      <RowHalf>
        <RowDesc>Wind derection:</RowDesc>
        <RowValue>
          <WindIcon
            src="/static/icons/icon-wind-dir.svg"
            className="icon-wind-dir"
            alt="Icon wind direction"
          />
          <RowUnit>NNE</RowUnit>
        </RowValue>
      </RowHalf>
      <RowHalf>
        <RowDesc>Wind speed:</RowDesc>
        <RowValue>
          10,5 <RowUnit>m/s</RowUnit>
        </RowValue>
      </RowHalf>
    </Row> */}
  </SensorCard>
)
const SensorCard = styled.div`
  position: relative;
  width: 360px;
  padding-top: 20px;
  border: 1px solid #eaecee;
  border-radius: 6px;
  margin-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.19s ease-out;
  width: 390px;
  border: none;
  cursor: default;
  box-shadow: 0 10px 24px 0 rgba(0, 0, 0, 0.2);
  &:nth-child(2n) {
    top: 70px;
  }
  &::before {
    content: '';
    position: absolute;
    right: -12px;
    top: 0;
    border-top: 10px solid #fff;
    border-right: 12px solid transparent;
    border-left: 12px solid transparent;
    @media (max-width: 1195px) {
      right: auto;
      left: -12px;
    }
    @media (max-width: 760px) {
      visibility: hidden;
    }
  }
  &:nth-child(2n)::before {
    right: auto;
    left: -12px;
  }
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    right: -41px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #009fff;
    box-shadow: 0 2px 10px 0 rgba(0, 159, 255, 0.4);
    @media (max-width: 1195px) {
      left: -36px;
    }
    @media (max-width: 760px) {
      visibility: hidden;
    }
  }
  &:nth-child(2n)::after {
    right: auto;
    left: -40px;
  }
  @media (max-width: 1195px) {
    margin-bottom: 30px;
    &:nth-child(2n) {
      top: 0;
    }
    &:nth-child(2n)::after {
      left: -36px;
    }
  }
  @media (max-width: 1120px) {
    margin-bottom: 20px;
  }
  @media (max-width: 470px) {
    width: 280px;
    padding-top: 10px;
    margin-bottom: 10px;
  }
`

const CardHeader = styled.header`
  position: relative;
  padding: 0 30px 8px 30px;
  border-bottom: 1px solid #eaecee;
`
const HeaderRow = styled.p`
  font: 12px/16px 'Nunito Sans', sans-serif;
  color: #808b92;
`
const HeaderAccent = styled.span`
  font-size: 18px;
  line-height: 33px;
  margin-right: 10px;
  color: #009fff;
  @media (max-width: 470px) {
    display: block;
  }
`

const Row = styled.div`
  &:not(:last-of-type) {
    border-bottom: 1px solid #eaecee;
  }
  @media (max-width: 470px) {
    &:not(:last-of-type) {
      border: none;
    }
    &:first-of-type {
      padding-top: 10px;
    }
  }
  &:last-of-type {
    padding-bottom: 10px;
  }
`
const RowHalf = styled.div`
  padding: 20px 30px 8px;
  display: inline-block;
  &:first-child {
    width: 195px;
    border-right: 1px solid #eaecee;
  }
  @media (max-width: 760px) {
    &:first-child {
      border: none;
    }
  }
  @media (max-width: 470px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    &:first-child {
      width: 100%;
    }
    &:not(:last-of-type) {
      border: none;
    }
  }
`
const RowDesc = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
  color: #808b92;
  margin: 0;
`
const RowValue = styled.p`
  font-size: 26px;
  font-weight: 800;
  line-height: 42px;
  @media (max-width: 470px) {
    width: 53%;
    font-size: 20px;
    line-height: 0;
  }
`
const RowUnit = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 42px;
  position: relative;
  top: -8px;
  right: -4px;
  @media (max-width: 470px) {
    line-height: 30px;
    top: -4px;
  }
`

const WindIcon = styled.img`
  transform: rotate(-57deg);
  position: relative;
  top: -2px;
`
