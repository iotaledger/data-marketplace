import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import MiniHeader from '../components/header/mini-header';
import SensorList from '../components/sensor-list';
import Footer from '../components/footer';
import Map from '../components/map';
import { allDevices } from '../utils/firebase';

const Header = ({ onAnchorClick }) => {
  return (
    <Container>
      <Shapes>
        <Shape1 src="/static/shapes/get_involved/shape-5.svg" alt="Background shape" />
        <Shape2 src="/static/shapes/get_involved/shape-header-hero1.svg" alt="Background shape" />
        <Tagline>Try the Data Marketplace</Tagline>
      </Shapes>
      <Info>
        <Link to={'/demo/#map'} onClick={() => onAnchorClick('map')}>
          <SubLink>{'Sensors on the Map'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/demo/#list'} onClick={() => onAnchorClick('list')}>
          <SubLink>{'Marketplace Sensors'.toUpperCase()}</SubLink>
        </Link>
      </Info>
    </Container>
  );
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: null,
      devices: [],
      loading: true,
    };

    this.onAnchorClick = this.onAnchorClick.bind(this);
  }

  async componentDidMount() {
    const devices = await allDevices(firebase);
    this.setState({ devices, loading: false });
  }

  onAnchorClick(anchor) {
    this.setState({ anchor });
  }

  render() {
    const { anchor } = this.state;
    return (
      <Main>
        <MiniHeader />
        <Header onAnchorClick={this.onAnchorClick} />
        <Map {...this.state} />
        <SensorList {...this.state} />
        <Footer />
      </Main>
    );
  }
}

const Main = styled.div`
  overflow-x: hidden;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 150px;
`;

const Info = styled.div`
  width: 40%;
  max-width: 600px;
  padding: 87px 0 40px 100px;
  @media (max-width: 1120px) {
    max-width: 420px;
    padding: 30px 0 180px;
    margin-left: 65px;
  }
  @media (max-width: 760px) {
    padding-bottom: 90px;
    margin-left: 10px;
  }
  @media (max-width: 700px) {
    max-width: 400px;
  }
  @media (max-width: 600px) {
    margin-left: 5px;
  }
`;

const SubLink = styled.p`
  @media (max-width: 760px) {
    font-size: 18px;
    line-height: 28px;
  }
  font-size: 14px;
  letter-spacing: 1.5px;
  font-weight: 600;
  line-height: 33px;
  padding: 7px 15px 0;
  color: rgba(78, 90, 97, 1);
  opacity: 0.5;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Tagline = styled.h2`
  line-height: 1.48;
  max-width: 400px;
  margin-bottom: 40px;
  color: #fff;
  font-size: 42px;
  font-weight: 400;
  letter-spacing: normal;
  text-align: center;
  position: absolute;
  top: 245px;
  left: 35vw;
`;

const Shapes = styled.div`
  width: 60%;
`;

const Shape = styled.img`
  position: absolute;
  z-index: -10;
`;

const Shape1 = Shape.extend`
  transform: skew(-65deg, 66deg);
  top: 254px;
  right: 71vw;
  width: 7%;
`;

const Shape2 = Shape.extend`
  transform: skew(-14deg, 195deg);
  top: 130px;
  left: 29vw;
  width: 33%;
`;
