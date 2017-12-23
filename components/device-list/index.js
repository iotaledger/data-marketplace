import React from 'react'
import styled, { keyframes } from 'styled-components'
import DeviceCard from '../device-card'
import Inview from '../inview'

const InfoCol = styled.main`
  position: relative;
  width: 880px;

  @media (max-width: 760px) {
    width: 100%;
    padding: 0;
  }
`

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
`

export default props => (
  <InfoCol>
    <CardWrapper>
      {Array(5)
        .fill()
        .map((packet, i) => (
          <DeviceCard index={i} key={i} layout={props.layout} packet={packet} />
        ))}
    </CardWrapper>
  </InfoCol>
)
