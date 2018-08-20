import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MiniHeader from '../components/header/mini-header';
import Content from '../components/content';
import Features from '../components/feature-section';
import Footer from '../components/footer';

const content1 = {
  text: `IOTA is a not for profit Foundation developing the Tangle, a new opensource permissionless Distributed Ledger Technology fit for the IoT / M2M economy. As such, IOTA seeks to enable a large spectrum of innovation across multiple industries and geographies so as to catalyse the adoption of the IOTA Tangle in to the Backbone for the Internet of (every)Things.`,
};

const content2 = {
  id: 'open-innovation-ecosystem',
  title: 'A growing open innovation ecosystem',
  text: `The Data marketplace PoC is used to demystify IOTA via a  very simple experiment. Activities were driven via webinars and two workshops taking place in Oslo (Trusted IoT) and Berlin (Personal Data). Participants to the initiative are also joining a growing ecosystem of corporate institutions and not-for-profit organisations interested in exploring together the potential of IOTA.`,
};

const content3 = {
  text: `The <a href="#/home#participants">Participants</a> to the initiative, 70+ as of july 2018, come from many different sectors including Mobility, Energy, Agriculture, Real Estate, eHealth, Smart Manufacturing, Supply chain, Financial services, Semiconductors, IT integrators, Consulting, Universities, Industry clusters.`,
};

const content4 = {
  id: 'business-model-innovation',
  title: 'Business model innovation',
  text: `The IOTA Tangle represents a great opportunity to reinvent business models in the M2M/IoT realm. This can apply to autonomous economic agents (ex: autonomous EVs and drones) in smart cities`,
};

const content5 = {
  text: `Because much of the innovation is handling personal data, e-privacy and GDPR aspects are becoming a key success factor for future data marketplaces. Dialogue with participants contributed to shaping a new lense on the opportunity landscape we call “Personal Data” where digital identity, personal data management and human centric innovation can be shaped with IOTA.
<br /><br />At the intersection of the Economy of Things and Personal Data, the Smart Sharing Economy represents a very large potential area of innovation for IOTA which can be applied to context such as smart communities and cities.
<br /><br />Going forward the IOTA Foundation decided to further strengthen its proactive engagement with stakeholders working with the above cross-vertical arenas.`,
};

const content6 = {
  id: 'follow-up',
  title: 'Follow-up initiatives',
  text: `Follow-up initiatives take various shape including ideation workshops, joint use case development or hackathons. Here are a few initiatives as examples:`,
};

const Header = ({ onAnchorClick }) => {
  return (
    <Container>
      <Shapes>
        <Shape1 src="/static/shapes/business/shape-5.svg" alt="Background shape" />
        <Shape2 src="/static/shapes/business/shape-header-hero.svg" alt="Background shape" />
        <Tagline>Exploring together new business models</Tagline>
      </Shapes>
      <Info>
        <Link
          to={'/business/#open-innovation-ecosystem'}
          onClick={() => onAnchorClick('open-innovation-ecosystem')}>
          <SubLink>{'Open innovation ecosystem'.toUpperCase()}</SubLink>
        </Link>
        <Link
          to={'/business/#business-model-innovation'}
          onClick={() => onAnchorClick('business-model-innovation')}>
          <SubLink>{'Business model innovation'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/business/#follow-up'} onClick={() => onAnchorClick('follow-up')}>
          <SubLink>{'Follow-up initiatives'.toUpperCase()}</SubLink>
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
    };

    this.onAnchorClick = this.onAnchorClick.bind(this);
  }

  onAnchorClick(anchor) {
    this.setState({ anchor });
  }

  render() {
    const { anchor } = this.state;
    return (
      <Main id="main">
        <MiniHeader />
        <Header onAnchorClick={this.onAnchorClick} />
        <Content content={content1} />
        <Content content={content2} anchor={anchor} />
        <ImgContainer>
          <Image
            width={30}
            src="/static/illustrations/exploring.png"
            alt="Open innovation ecosystem"
          />
        </ImgContainer>
        <Content content={content3} />
        <Content content={content4} anchor={anchor} />
        <ImgContainer>
          <Image
            src="/static/illustrations/business_model_innovation.png"
            alt="Business model innovation"
          />
        </ImgContainer>
        <Content content={content5} />
        <Content content={content6} anchor={anchor} />
        <Features />
        <Footer />
      </Main>
    );
  }
}

const Main = styled.div`
  overflow-x: hidden;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: ${props => (props.width ? `${props.width}%` : '50%')};
  height: 50%;
  padding: 10px 0;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 80px;
`;

const Info = styled.div`
  width: 40%;
  max-width: 600px;
  padding: 161px 0 40px 100px;
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
  top: 235px;
  left: 32vw;
  @media (max-width: 1120px) {
    margin-bottom: 25px;
  }
  @media (max-width: 700px) {
    font-size: 18px;
    line-height: 28px;
    max-width: 300px;
    margin-bottom: 30px;
  }
  @media (max-width: 470px) {
    max-width: 230px;
  }
`;

const Shapes = styled.div`
  width: 60%;
`;

const Shape = styled.img`
  position: absolute;
  z-index: -10;
`;

const Shape1 = Shape.extend`
  transform: skew(73deg, -67deg);
  top: 311px;
  right: 71vw;
  width: 7%;
`;

const Shape2 = Shape.extend`
  transform: skewY(177deg);
  top: 130px;
  left: 31vw;
  width: 33%;
`;
