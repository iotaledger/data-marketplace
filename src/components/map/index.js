import React from 'react';
import ReactGA from 'react-ga';
import MapGL, { Popup, NavigationControl } from '!react-map-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { connect } from 'react-redux';
import Controls from './controls';
import Markers from './markers';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CardFooter, CardHeader, FootRow, Header, HeaderBg, HeaderBgMobile, Heading, InfoKey, InfoValue, LocationIcon, Main, SensorCard, SensorId, SensorType, Subtitle } from './styles';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const mapControls = new Controls();

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 52.23,
        longitude: 11.16,
        zoom: 3.74,
        bearing: 0,
        pitch: 15,
        width: 800,
        height: 900,
      },
      popupInfo: null,
      mapHeight: 900,
      devices: props.devices
    };

    this.openPopup = this.openPopup.bind(this);
    this.resize = this.resize.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    const mapHeight = window.innerWidth < 760 ? 500 : 900;

    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight,
      },
      mapHeight,
    });
  }

  trackRedirect = sensorId => {
    ReactGA.event({
      category: 'Map sensor redirect',
      action: 'Map sensor redirect',
      label: `Sensor ID ${sensorId}`
    });
  }

  updateViewport(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });
  }

  renderPopup() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={10}
          anchor="bottom-left"
          offsetTop={-5}
          offsetLeft={5}
          closeButton={true}
          longitude={Number(popupInfo.lon)}
          latitude={Number(popupInfo.lat)}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <SensorCard
            to={`/sensor/${popupInfo.sensorId}`}
            onClick={() => this.trackRedirect(popupInfo.sensorId)}
          >
            <CardHeader>
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
                <InfoKey>Sensor Streams:</InfoKey>
                <InfoValue>{popupInfo.dataTypes.length}</InfoValue>
              </FootRow>
              <FootRow>
                <InfoKey>Price:</InfoKey>
                <InfoValue>{popupInfo.price || popupInfo.value}i</InfoValue>
              </FootRow>
            </CardFooter>
          </SensorCard>
        </Popup>
      )
    );
  }

  openPopup(device) {
    this.setState({ popupInfo: device });
  }

  render() {
    const { devices, viewport, mapHeight, popupInfo } = this.state;
    const { settings } = this.props;
    if (!settings.mapboxApiAccessToken) return <div />;

    return (
<Main id="map">
  <Header>
    <div>
      <Heading>Sensor map</Heading>
      <Subtitle>Click on a pin to view the sensor information.</Subtitle>
    </div>
  </Header>
  <MapGL
    scrollZoom={false}
    controller={mapControls}
    maxZoom={11.5}
    {...viewport}
    height={mapHeight}
    mapStyle='mapbox://styles/mapbox/streets-v11'
    onViewportChange={this.updateViewport}
    onClick={() => (popupInfo ? this.setState({ popupInfo: null }) : null)}
    mapboxApiAccessToken={settings.mapboxApiAccessToken}>
<div style={{ position: 'absolute', right: 60, top: 10 }}>
  <NavigationControl onViewportChange={this.updateViewport} />
</div>
<Markers devices={devices} openPopup={this.openPopup} />
{this.renderPopup()}
  </MapGL>

  <HeaderBg
    src="/static/shapes/shape-main-1.svg"
    className="shape-accent-1 mobile-hidden"
    alt="Shape accent"
  />
  <HeaderBgMobile
    src="/static/shapes/shape-main-1-mobile.svg"
    className="shape-accent-1 desktop-hidden shape-mobile"
    alt="Shape accent"
  />
</Main>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Map);
