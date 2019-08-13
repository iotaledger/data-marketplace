import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { devices: [], slideIndex: 0 };

    this.shift = this.shift.bind(this);
    this.sort = this.sort.bind(this);
  }

  componentDidMount() {
    this.setState({ devices: this.sort(this.props.devices) });
  }

  componentDidUpdate() {
    if (this.props.anchor) {
      const target = document.querySelector(`#${this.props.anchor}`);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  sort(devices) {
    const slides = [];
    let count = -1;
    devices.filter(device => !device.inactive).forEach((device, i) => {
      if (i % 6 === 0) {
        count++;
        slides[count] = [];
      }
      slides[count].push(device);
    });
    return slides;
  }

  shift(direction) {
    if (direction === 'right') {
      this.setState({ slideIndex: this.state.slideIndex + 1 });
    } else {
      this.setState({ slideIndex: this.state.slideIndex - 1 });
    }
  }

  trackRedirect = sensorId => {
    ReactGA.event({
      category: 'Map sensor redirect',
      action: 'Map sensor redirect',
      label: `Sensor ID ${sensorId}`
    });
  }

  render() {
    const { devices, slideIndex } = this.state;
    return (
      <Section id="list">
        <Header>
          <Heading>Marketplace Sensors</Heading>
          <Tagline>Click below to view and purchase sensor data stream</Tagline>
        </Header>
        <SlideWrapper index={slideIndex}>
          {Object.keys(devices).map((company, i) => (
            <Slide index={i} slide={slideIndex} key={`company-${i}`}>
              {devices[company].map((item, index) => (
                <Card
                  data-component="SensorCard"
                  key={`sensor-${index}`}
                  to={`/sensor/${item.sensorId}`}
                  onClick={() => this.trackRedirect(item.sensorId)}
                >
                  <CardHeader>
                    <SensorType>{item.type}</SensorType>
                    <SensorId>
                      {item.sensorId && item.sensorId.length > 20
                        ? `${item.sensorId.substr(0, 20)}...`
                        : item.sensorId}
                    </SensorId>
                  </CardHeader>

                  <RowHalf>
                    <RowIcon src="/static/icons/icon-small-location.svg" alt="" />
                    <RowDesc>Location</RowDesc>
                    <Data>{item.location.city || '--'}</Data>
                  </RowHalf>
                  <RowHalf>
                    <RowIcon src="/static/icons/icon-small-packet.svg" alt="" />
                    <RowDesc>Sensor streams:</RowDesc>
                    <Data>{item.dataTypes.length}</Data>
                  </RowHalf>
                  <CardFooter>
                    <FootRow>
                      <InfoKey>Owner:</InfoKey>
                      <InfoValue>{item.company || '--'}</InfoValue>
                    </FootRow>
                    <FootRow>
                      <InfoKey>Price:</InfoKey>
                      <InfoValue>{item.price || item.value ? `${item.price || item.value}i` : '--'}</InfoValue>
                    </FootRow>
                  </CardFooter>
                </Card>
              ))}
            </Slide>
          ))}
        </SlideWrapper>
        <Nav>
          <Button type="button" onClick={() => slideIndex > 0 && this.shift('left')}>
            <Arrow active={slideIndex > 0}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <polygon
                  fill="#CEDBE2"
                  fillRule="evenodd"
                  points="36.867 22.18 36.867 23.82 26.707 23.82 31.367 28.5 30.188 29.68 23.508 23 30.188 16.32 31.367 17.5 26.707 22.18"
                  transform="translate(-23 -16)"
                />
              </svg>
            </Arrow>
          </Button>
          <Button
            type="button"
            onClick={() => slideIndex < Object.keys(devices).length - 1 && this.shift('right')}>
            <Arrow
              style={{ transform: 'rotate(180deg)' }}
              active={slideIndex < Object.keys(devices).length - 1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <polygon
                  fill="#CEDBE2"
                  fillRule="evenodd"
                  points="36.867 22.18 36.867 23.82 26.707 23.82 31.367 28.5 30.188 29.68 23.508 23 30.188 16.32 31.367 17.5 26.707 22.18"
                  transform="translate(-23 -16)"
                />
              </svg>
            </Arrow>
          </Button>
        </Nav>
        <Shape src="/static/shapes/shape-main-2.svg" className="shape-accent-2" alt="Shape svg" />
      </Section>
    );
  }
}

const Shape = styled.img`
  position: absolute;
  bottom: 0px;
  left: 70vw;
  z-index: -100;
  @media (max-width: 1120px) {
    bottom: 100px;
    left: 36vw;
  }
  @media (max-width: 760px) {
    display: none;
  }
`;

const Section = styled.section`
  position: relative;
  padding-top: 90px;
  border-top: 1px solid #eaecee;
  padding-bottom: 90px;
  margin-bottom: 120px;
  overflow-y: hidden;
  overflow-x: hidden;
  min-height: 600px;

  @media (max-width: 760px) {
    padding-top: 40px;
  }

  @media (max-width: 1120px) {
    padding-top: 50px;
  }
`;

const Header = styled.header`
  margin-bottom: 30px;
  @media (max-width: 760px) {
    margin-bottom: 20px;
  }
`;

const Heading = styled.h3`
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  text-align: center;
  text-transform: capitalize;
  color: #009fff;
  @media (max-width: 760px) {
    font-size: 24px;
    margin-bottom: 0;
  }
`;

const SlideWrapper = styled.div`
  position: relative;
  height: auto;
  transition: all 0.4s ease;
  overflow-x: hidden;
  /* min-height: 620px;
  @media (max-width: 1110px) {
    min-height: 920px;
  } */
`;

const slide = (index, slide) => {
  if (index === slide) {
    return '50%';
  }
  if (index > slide) {
    return '150%';
  } else {
    return '-150%';
  }
};

const Slide = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  position: ${props => (props.index === props.slide ? 'relative' : 'absolute')};
  top: 0;
  left: ${props => slide(props.index, props.slide)};
  transform: translateX(-50%);
  transition: all 0.4s ease-out;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  @media (max-width: 1420px) {
    justify-content: space-around;
  }
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const Card = styled(Link)`
  color: inherit;
  text-decoration: none;
  position: relative;
  width: 360px;
  padding-top: 20px;
  border: 1px solid #eaecee;
  border-radius: 6px;
  margin-bottom: 30px;
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
`;

const CardHeader = styled.header`
  position: relative;
  padding: 0 30px 8px 30px;
  border-bottom: 1px solid #eaecee;
`;

const RowHalf = styled.div`
  padding: 20px 0 14px 30px;
  display: inline-block;
  width: 50%;

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
`;

const Data = styled.p`
  color: #000000;
  font-size: 18px;
  line-height: 30px;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowDesc = styled.span`
  margin-left: 5px;
  font: 12px/16px 'Nunito Sans', sans-serif;
  color: #808b92;
`;

const RowIcon = styled.img`
  position: relative;
  top: 1px;
`;

const CardFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90px;
  padding: 20px 30px;
  background-color: rgba(206, 218, 226, 0.2);
  border-top: 1px solid #eaecee;
`;

const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const InfoKey = styled.span`
  color: #808b92;
  text-transform: capitalize;
  font: 12px/16px 'Nunito Sans', sans-serif;
`;

const InfoValue = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  max-width: 250px;
  text-align: right;
  color: #000000;
`;

const SensorType = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
  position: absolute;
  top: -8px;
  color: #808b92;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const SensorId = styled.span`
  font-size: 24px;
  top: 6px;
  line-height: 42px;
  position: relative;
  color: #009fff;
`;

const Nav = styled.nav`
  margin: 30px 0;
  text-align: center;
  @media (max-width: 1120px) {
    margin-top: 20px;
  }
`;

const Button = styled.button`
  position: relative;
  width: 60px;
  height: 46px;
  border-radius: 100px;
  margin: 0 5px;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  &:active {
    background-color: #009fff;
    box-shadow: 0 16px 25px 0 rgba(0, 159, 255, 0.27);
    svg {
      polygon {
        fill: #fff;
      }
    }
  }
  border: 1px solid #eaecee;
  color: #808b92;
  background-color: #fff;
`;

const Arrow = styled.div`
  polygon {
    fill: ${props => (props.active ? '#009fff' : '#cedbe2')};
  }
`;

const Tagline = styled.h4`
  @media (max-width: 760px) {
    font-size: 18px;
    line-height: 28px;
  }
  font-size: 19px;
  font-weight: 400;
  line-height: 33px;
  margin-bottom: 60px;
  text-align: center;
  color: #4e5a61;
`;
