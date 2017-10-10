import React from "react"
import styled from "styled-components"

const Main = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
  height: 100px;
  background-color: #fff;
  @media (max-width: 1195px) {
    height: 90px;
  }
  @media (max-width: 760px) {
    height: 66px;
  }
`
const Header = styled.header`
  margin: 5px auto 0 30px;
  display: block;
`

const Back = styled.a`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 90px;
  border-right: 1px solid #eaecee;
  @media (max-width: 760px) {
    width: 46px;
    border: none;
  }
`

const Desc = styled.span`
  font: 12px/16px "Nunito Sans", sans-serif;
  color: #808b92;
  position: absolute;
`

const DeviceID = styled.span`
  font-size: 24px;
  line-height: 42px;
  position: relative;
  top: -4px;
  color: #009fff;
  @media (max-width: 760px) {
    font-size: 15px;
    line-height: 42px;
    top: 4px;
  }
`

const RightHeader = styled.div`
  display: flex;
  height: 100%;
`

const NavGraphics = styled.img`
  height: 100%;
  width: auto;
  @media (max-width: 760px) {
    width: 66px;
    object-fit: cover;
  }
`

const SensorIcon = styled.img`
  margin-right: 10px;
  @media (max-width: 760px) {
    display: none;
  }
`

export default props => (
  <Main>
    <Back href="/">
      <img src="/static/icons/icon-arrow-back-dark.svg" alt="Icon arrow" />
    </Back>
    <Header>
      <SensorIcon
        src="/static/icons/icon-drops.svg"
        alt="Weather sensor icon"
      />
      <Desc>Soil Sensor</Desc>
      <DeviceID>ID-34199</DeviceID>
    </Header>
    <RightHeader>
      <NavGraphics
        src="/static/ilustrations/sensor-image.png"
        srcSet="/static/ilustrations/sensor-image@2x.png 2x"
        alt="IOTA sensor ilustration"
      />
      <NavGraphics
        src="/static/ilustrations/sensor-location-image.png"
        srcSet="/static/ilustrations/sensor-location-image@2x.png 2x"
        alt="IOTA sensor location graphic"
      />
    </RightHeader>
  </Main>
)
