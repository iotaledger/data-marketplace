import React from 'react'
import styled, { keyframes } from 'styled-components'
import SensorCard from '../sensor-card'
import Inview from '../inview'

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
`

export default props => (
  <InfoCol>
    <CardWrapper>
      {props.packets &&
        props.packets
          .sort((a, b) => b.time - a.time)
          .map((packet, i) => (
            <SensorCard
              index={i}
              key={i}
              layout={props.layout}
              packet={packet}
            />
          ))}
      <Fetcher>
        {props.dataEnd ? (
          <Hide>
            <More>{`End of data reached`}</More>
          </Hide>
        ) : (
          <Inview func={props.func}>
            {props.fetching && props.packets[0] ? (
              <Hide>
                <Loading />
              </Hide>
            ) : null}
          </Inview>
        )}
        <Block />
      </Fetcher>
    </CardWrapper>
  </InfoCol>
)
const Block = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 0;
`
const Fetcher = styled.div`
  position: absolute;
  bottom: 10px;
  color: white;
  padding: 20px 10px;
  margin: 10px 0 20px;
  @media (max-width: 760px) {
    position: relative;
  }
`

const Hide = styled.div`
  opacity: 0;
  @media (max-width: 760px) {
    opacity: 1;
  }
`
const More = styled.div``
const Loading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 38 38"
      stroke="#fff"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            transform="rotate(319.698 18 18)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}
