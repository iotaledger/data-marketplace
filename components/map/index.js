import React from 'react'
import styled, { css, injectGlobal } from 'styled-components'
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl'
import { Link } from '../../routes'
import { getBalance } from '../../lib/iota'
import CSS from './css'
const navStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '10px'
}

export default class extends React.Component {
  state = {
    viewport: {
      latitude: 52.23,
      longitude: 11.16,
      zoom: 3.74,
      bearing: 0,
      pitch: 30,
      width: 800
    },
    popupInfo: null
  }
  componentDidMount() {
    window.addEventListener('resize', this._resize)
    this._resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize)
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    })
  }
  _updateViewport = viewport => {
    this.setState({ viewport })
  }

  _renderCityMarker = (device, index) => {
    return (
      <Marker
        key={`marker-${device.sensorId}`}
        longitude={Number(device.lon)}
        latitude={Number(device.lat)}
      >
        {<Pin onClick={() => this.setState({ popupInfo: device })} />}
      </Marker>
    )
  }

  _renderPopup = () => {
    const { popupInfo } = this.state
    return (
      popupInfo && (
        <Popup
          tipSize={10}
          anchor="bottom-left"
          offsetTop={-30}
          offsetLeft={10}
          closeButton={true}
          longitude={Number(popupInfo.lon)}
          latitude={Number(popupInfo.lat)}
          closeOnClick={true}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <Link route={`/sensor/${popupInfo.sensorId}`} prefetch>
            <SensorCard href="">
              <CardHeader>
                {/* <CardIcon
                  src="/static/icons/icon-weather-small.svg"
                  alt="Weather sensor icon"
                /> */}
                <SensorType>
                  {popupInfo.type}{' '}
                  <LocationIcon
                    src="/static/icons/icon-small-location-dark.svg"
                    alt="Icon location pin"
                  />{' '}
                  <span>{popupInfo.location.city}</span>
                </SensorType>
                <SensorId>
                  {popupInfo.sensorId.length > 12
                    ? `${popupInfo.sensorId.substring(0, 13)}...`
                    : popupInfo.sensorId}
                </SensorId>
              </CardHeader>
              <CardFooter>
                <FootRow>
                  <InfoKey>Owner:</InfoKey>
                  <InfoValue>{popupInfo.company}</InfoValue>
                </FootRow>
                <FootRow>
                  <InfoKey>Device Balance:</InfoKey>
                  <InfoValue>Lorem ipsum</InfoValue>
                </FootRow>
                <FootRow>
                  <InfoKey>Data price:</InfoKey>
                  <InfoValue>{popupInfo.value}i</InfoValue>
                </FootRow>
              </CardFooter>
            </SensorCard>
          </Link>
        </Popup>
      )
    )
  }

  render() {
    const { viewport } = this.state
    const { devices } = this.props
    return (
      <Main id={'map'}>
        <Header>
          <Heading>Sensor map</Heading>
          <Subtitle>Click on a pin to view the sensor information.</Subtitle>
        </Header>
        <MapGL
          maxZoom={11.5}
          scrollZoom={false}
          {...viewport}
          height={900}
          mapStyle="mapbox://styles/iotafoundation/cj8y282t417092rlgv4j9wcxg"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={`pk.eyJ1IjoiaW90YWZvdW5kYXRpb24iLCJhIjoiY2o4eTFnMnJyMjhjazMzbWI1cTdmcndmMCJ9.9tZ4MHPpl54wJvOrAWiE7g`}
        >
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>

          {devices
            .filter(device => device.lon && device.lat)
            .map(this._renderCityMarker)}

          {this._renderPopup()}
        </MapGL>
        {/* <Pin>
          <SensorCard href="./sensor-data.html">
            <CardHeader>
              <CardIcon
                src="/static/icons/icon-weather-small.svg"
                alt="Weather sensor icon"
              />
              <SensorType>
                Weather{" "}
                <LocationIcon
                  src="/static/icons/icon-small-location-dark.svg"
                  alt="Icon location pin"
                />{" "}
                <span>Berlin</span>
              </SensorType>
              <SensorId>ID-27281</SensorId>
            </CardHeader>
            <CardFooter>
              <FootRow>
                <InfoKey>Owner:</InfoKey>
                <InfoValue>Patrick Moore</InfoValue>
              </FootRow>
              <FootRow>
                <InfoKey>Data entries:</InfoKey>
                <InfoValue>Lorem ipsum</InfoValue>
              </FootRow>
              <FootRow>
                <InfoKey>Data price:</InfoKey>
                <InfoValue>$0.01</InfoValue>
              </FootRow>
            </CardFooter>
          </SensorCard>
        </Pin> */}

        <HeaderBg
          src="/static/shapes/shape-main-1.svg"
          class="shape-accent-1 mobile-hidden"
          alt="Shape accent"
        />
        <HeaderBgMobile
          src="/static/shapes/shape-main-1-mobile.svg"
          class="shape-accent-1 desktop-hidden shape-mobile"
          alt="Shape accent"
        />
      </Main>
    )
  }
}

const Main = styled.main`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 74px;
    left: 0;
    height: 1px;
    width: 100vw;
    background-color: #eaecee;
    @media (max-width: 760px) {
      top: 0;
    }
  }
`

const Header = styled.div`
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  display: inline-block;
  width: 300px;
  position: absolute;
  z-index: 1100;
  padding-top: 140px;
  @media (max-width: 760px) {
    padding-top: 50px;
  }
`

const Nav = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 10px;
  z-index: 100;
`

const Heading = styled.h3`
  text-transform: capitalize;
  text-align: left;
  color: #009fff;
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  @media (max-width: 760px) {
    font-size: 24px;
    margin-bottom: 0;
    margin-bottom: 10px;
  }
`
const Subtitle = styled.h4`
  font-size: 19px;
  font-weight: 400;
  line-height: 33px;
  margin-bottom: 60px;
  max-width: 265px;
  color: #fff;
  text-align: left;
  @media (max-width: 1120px) {
    max-width: 215px;
  }
  @media (max-width: 760px) {
    font-size: 18px;
    line-height: 28px;
  }
`
const HeaderBg = styled.img`
  position: absolute;
  top: -120px;
  right: 70vw;
  z-index: 1000;
  @media (max-width: 1120px) {
    right: 67vw;
  }
  @media (max-width: 760px) {
    top: -100px;
    right: 55vw;
    display: none;
  }
  @media (max-width: 520px) {
    right: 35vw;
  }
`

const HeaderBgMobile = styled.img`
  position: absolute;
  top: -20px;
  right: 70vw;
  z-index: 1000;
  display: none;
  @media (max-width: 1120px) {
    right: 67vw;
  }
  @media (max-width: 760px) {
    top: -100px;
    right: 55vw;
    display: block;
  }
  @media (max-width: 520px) {
    right: 35vw;
  }
  @media (max-width: 370px) {
    right: 25vw;
  }
`

const SensorCardWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 760px) {
    display: block;
  }
`

const SensorCard = styled.a`
  display: block;
  border-radius: 6px;
  transition: box-shadow 0.19s ease-out;
  position: relative;
  user-select: none;
  cursor: default;
  color: inherit;
  text-decoration: none;
  width: 280px;
  height: 150px;
  padding-top: 19px;
  border: none;
  background-color: #0e38a0;
  box-shadow: 0 14px 28px 0 rgba(10, 32, 87, 0.24);
  @media (max-width: 760px) {
    margin-bottom: 10px;
  }
`

const Pin = styled.div`
  background-image: linear-gradient(-140deg, #184490 0%, #0a2056 100%);
  position: absolute;
  height: 20px;
  width: 20px;
  top: -20px;
  right: -10px;
  transform: rotate(-45deg);
  border-radius: 50% 50% 50% 0;
  cursor: pointer !important;
  box-shadow: -10px 9px 12px 0 rgba(10, 32, 87, 0.12);
`

const CardHeader = styled.header`
  position: relative;
  padding: 0 30px 8px 30px;
  border-bottom: 1px solid rgba(115, 143, 212, 0.2);
`

const CardFooter = styled.footer`
  padding: 20px 30px;
  padding: 8px 30px;
  border-top: none;
  background-color: transparent;
`
const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
`

const InfoKey = styled.span`
  color: #738fd4;
  text-transform: capitalize;
  font: 12px/16px 'Nunito Sans', sans-serif;
`

const InfoValue = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #fff;
`
const CardIcon = styled.img`margin-right: 10px;`
const LocationIcon = styled.img`margin: 0 6px 0 13px;`
const SensorType = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
  position: absolute;
  top: -8px;
  color: #738fd4;
`
const SensorId = styled.span`
  font-size: 20px;
  top: 4px;
  color: #fff;
  line-height: 42px;
  position: relative;
`
//override
injectGlobal`
 .mapboxgl-popup-close-button {
   position: absolute;
   top: 2px;
   right: 10px;
    color: rgba(255, 255, 255, .3);
    z-index: 99;
    font-size: 120%;
    background: transparent;
  }
`
