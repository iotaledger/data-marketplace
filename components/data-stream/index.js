import React from 'react'
import styled, { keyframes } from 'styled-components'
import SensorCard from '../sensor-card'

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
`
const Pulse = keyframes`
0% {
   opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 300px;
  width: 100%;
  opacity: 0;
  animation: ${props =>
    !props.show ? `${Pulse} 1s alternate infinite` : `none`};
  z-index: 0;
  background-image: radial-gradient(
    ellipse at top,
    rgba(116, 209, 234, 0.3),
    rgba(116, 209, 234, 0) 50%
  );
  @media (max-width: 1200px) {
    width: calc(100% + 30px);
    background-image: radial-gradient(
      ellipse at top left,
      rgba(116, 209, 234, 0.3),
      rgba(116, 209, 234, 0) 50%
    );
  }
  @media (max-width: 760px) {
    width: 100%;
    background-image: radial-gradient(
      ellipse at top,
      rgba(116, 209, 234, 0.3),
      rgba(116, 209, 234, 0) 50%
    );
  }
`
const CardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 40px 0 100px;
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
`

export default props => (
  <InfoCol>
    <Loader show={props.packets[0]} />
    <CardWrapper>
      {props.packets &&
        props.packets
          .sort((a, b) => a.time - b.time)
          .map((packet, i) => (
            <SensorCard
              index={i}
              key={i}
              layout={props.layout}
              packet={packet}
            />
          ))}
    </CardWrapper>
  </InfoCol>
)
