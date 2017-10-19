import React from "react"
import styled, { css } from "styled-components"
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl"

export default class extends React.Component {
  state = {
    viewport: {
      //   latitude: 52.23,
      //   longitude: 11.16,
      latitude: 37.785164,
      longitude: -100,
      zoom: 3.74,
      bearing: 0,
      pitch: 0,
      width: 800
    },
    popupInfo: null
  }
  componentDidMount() {
    window.addEventListener("resize", this._resize)
    this._resize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize)
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

  _renderCityMarker = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
      >
        <Pin onClick={() => this.setState({ popupInfo: city })} />
      </Marker>
    )
  }

  _renderPopup() {
    const { popupInfo } = this.state
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom-left"
          offsetTop={10}
          closeButton={false}
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => this.setState({ popupInfo: null })}
        >
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
        </Popup>
      )
    )
  }

  render() {
    const { viewport } = this.state

    return (
      <Main id={"map"}>
        <Header>
          <Heading>Sensor map</Heading>
          <Subtitle>Lorem ipsum dolor sit amet sramet blablamet</Subtitle>
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
          {data.map(this._renderCityMarker)}

          {this._renderPopup()}

          <Nav className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </Nav>
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
    content: "";
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
  top: 20;
  right: 30;
  padding: 10px;
`
const navStyle = {
  position: "absolute",
  top: 20,
  right: 30
}

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
  font: 12px/16px "Nunito Sans", sans-serif;
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
  font: 12px/16px "Nunito Sans", sans-serif;
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
const data = [
  {
    city: "New York",
    population: "8,175,133",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
    state: "New York",
    latitude: 40.6643,
    longitude: -73.9385
  },
  {
    city: "Los Angeles",
    population: "3,792,621",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg",
    state: "California",
    latitude: 34.0194,
    longitude: -118.4108
  },
  {
    city: "Chicago",
    population: "2,695,598",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg",
    state: "Illinois",
    latitude: 41.8376,
    longitude: -87.6818
  },
  {
    city: "Houston",
    population: "2,100,263",
    image:
      "http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg",
    state: "Texas",
    latitude: 29.7805,
    longitude: -95.3863
  }
]
