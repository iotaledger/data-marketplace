import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BurgerMenu from '../components//header/burger';
import MiniHeader from '../components/header/mini-header';
import Content from '../components/content';
import Initiatives from '../components/feature-section/initiatives';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import Cookie from '../components/cookie';

const content1 = {
  text: `IOTA is a not-for-profit Foundation developing the Tangle, a new opensource permissionless Distributed Ledger Technology fit for the IoT / M2M economy. As such, IOTA seeks to enable a large spectrum of innovation across multiple industries and geographies in order to catalyse the adoption of the IOTA Tangle as the Backbone for the Internet of (every)Things.`,
};

const content2 = {
  id: 'open-innovation-ecosystem',
  title: 'A growing open innovation ecosystem',
  text: `The Data Marketplace PoC is used to demystify IOTA via a very simple experiment. Webinars and workshops took place in Oslo (Trusted IoT) and Berlin (Personal Data) to catalyze co-creation between participants. IOTA is thereby growing an ecosystem of corporations, institutions, and not-for-profit organisations interested in exploring together the potential of IOTA.`,
};

const content3 = {
  text: (<React.Fragment>
    The <Link to={{ pathname: '/', state: { anchor: 'participants' }}}>Participants</Link> to the initiative, 70+ as of 2019, come from many different sectors including Mobility, Energy, Agriculture, Real Estate, eHealth, Smart Manufacturing, Supply Chain, Financial Services, Semiconductors, IT integrators, Consulting, Universities, Industry clusters.
  </React.Fragment>)
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

  componentDidMount() {
    ReactGA.pageview('/business');
  }

  onAnchorClick(anchor) {
    this.setState({ anchor });
  }

  onScrollToTop() {
    const target = document.querySelector('#main');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render() {
    const { anchor } = this.state;
    return (
      <Main id="main">
        <Cookie />
        <BurgerMenu />
        <MiniHeader />
        <Header onAnchorClick={this.onAnchorClick} />
        <Content content={content1} />
        <Content content={content2} anchor={anchor} />
        <ImgContainer>
          <Image src="/static/illustrations/exploring.png" alt="Open innovation ecosystem" />
        </ImgContainer>
        <Content content={content3} />
        <Content content={content4} anchor={anchor} />
        <ImgContainer>
          <Image
            width={650}
            src="/static/illustrations/business_model_innovation.png"
            alt="Business model innovation"
          />
        </ImgContainer>
        <Content content={content5} />
        <Content content={content6} anchor={anchor} />
        <Initiatives />
        <ScrollToTop onClick={this.onScrollToTop} />
        <Footer />
      </Main>
    );
  }
}

const Main = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Image = styled.img`
  height: 100%;
  padding: 10px 0;
  width: ${props => (props.width ? `${props.width}px` : '300px')};
  @media (max-width: 650px) {
    width: ${props => (props.width ? `${props.width * 0.5}px` : '200px')};
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 80px;

  @media (max-width: 820px) {
    margin-bottom: 40px;
  }

  @media (max-width: 660px) {
    background-image: url(/static/shapes/business/shape-header-hero.svg);
    background-repeat: no-repeat;
    background-size: 625px 364px;
    background-position-y: 10px;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 550px) {
    background-size: 457px 400px;
    background-position-y: 0;
  }
`;

const Info = styled.div`
  width: 40%;
  max-width: 600px;
  padding: 100px 0 100px 100px;
  @media (max-width: 1220px) {
    width: 45%;
    padding: 90px 0 100px 50px;
  }
  @media (max-width: 1120px) {
    width: 40%;
    padding: 90px 0 100px 0px;
  }
  @media (max-width: 960px) {
    padding: 75px 0 50px 20px;
  }
  @media (max-width: 820px) {
    width: 55%;
  }
  @media (max-width: 760px) {
    padding: 56px 0 25px 0px;
  }
  @media (max-width: 660px) {
    width: 85%;
    padding: 30px 0 0;
    max-width: 420px;
    margin-left: 120px;
  }
  @media (max-width: 550px) {
    margin-left: 40px;
    padding-top: 40px;
  }
`;

const SubLink = styled.p`
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

  @media (max-width: 660px) {
    color: #ffffff;
    opacity: 0.7;
    line-height: 20px;
    margin: 15px 0;
  }
`;

const Tagline = styled.h2`
  display: none;
  max-width: 210px;
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 660px) {
    display: block;
    position: absolute;
    top: 90px;
    left: 3vw;
    color: #4e5a61;
  }
`;

const Shapes = styled.div`
  width: 60%;

  background-image: url(/static/shapes/business/shape-header-hero-text.svg);
  background-repeat: no-repeat;
  background-size: 585px 315px;
  background-position-x: 187px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1220px) {
    width: 55%;
    background-position-x: 100px;
    background-size: 560px 276px;
  }

  @media (max-width: 1120px) {
    width: 60%;
    background-size: 500px 260px;
  }

  @media (max-width: 960px) {
    background-size: 330px 241px;
    width: 55%;
  }

  @media (max-width: 820px) {
    background-size: 260px 241px;
  }

  @media (max-width: 767px) {
    background-size: 260px 200px;
    background-position-x: 30px;
  }
`;

const Shape = styled.img`
  position: absolute;
  z-index: -10;
`;

const Shape1 = styled(Shape)`
  transform: skew(73deg, -67deg);
  top: 311px;
  right: 71vw;
  width: 7%;

  @media (max-width: 1220px) {
    right: 73vw;
    top: 295px;
  }

  @media (max-width: 1120px) {
    top: 254px;
    right: 78vw;
  }

  @media (max-width: 960px) {
    top: 285px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;
