import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MiniHeader from '../components/header/mini-header';
import Cards from '../components/feature-section/feature-cards';
import Carousel from '../components/carousel';
import Content from '../components/content';
import Form from '../components/form';
import Heading from '../components/content/heading';
import List from '../components/content/list';
import WhyJoin from '../components/feature-section/why-join';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';

const content1 = {
  text: `IOTA is now streamlining open access to the demo and will continue signing up organisations to grow the co-creation ecosystem.`,
};

const content2 = {
  text: `Organisations can team up to develop use cases together. IOTA will support by streamlining access to information and providing guidance in developing on IOTA Tangle.`,
};

const content3 = {
  text: `Partners and initiatives with the following characteristics are particularly attractive to the IOTA Foundation:`,
};

const content4 = {
  text: `Please send us an email at <a href="mailto:datamarketplace@iota.org">datamarketplace@iota.org</a>`,
};

const content5 = {
  text: `The Foundation aims at launching in Q3/4 2018 a global virtual initiative to catalyse co-creation and bring developers and organisations to develop and showcase together their capabilities and creativity. New solutions across industries and geographies will be developed as hybrid, addons or use case proof of concept on top of an <a href="https://github.com/iotaledger/data-marketplace">opensource</a> version of the Data marketplace.
<br /><br />We are currently gathering interest from our ecosystem and <a href="#/home#participants">potential partners</a> willing to help shape this unique initiative. Examples include:`,
};

const content6 = {
  text: `Please submit your interest at <a href="mailto:datamarketplace@iota.org">datamarketplace@iota.org</a> preferably by 15th Sept.`,
};

const characteristics = [
  'Ambition to explore and develop new business models with the backing of management',
  'Access to inhouse understanding of DLT / Blockchain and built initial hypotheses of use cases to be explored. Onboarding the data marketplace helps to catalyse this process',
  'Ready to provide human resources, especially in IT capabilities',
  'Access to tangible assets (facilities, lab, connected hardware…) available for testbed piloting',
  'Embraces open innovation principles. Openness to publish/showcase publicly',
];

const examples = [
  '“We are a Blockchain Innovation Cluster and would like to train prospective participants with IOTA before the launch of the challenge.”',
  '“My organisation is a leading player in our region and would like host a physical hub so that participants meet face to face during the event”',
  '“Can my organisation provide sponsorship for a theme / Problem to be solved?”',
  '“Can we incentivize participants to use our IoT and connected devices as part of their solutions?”',
  '“We would like to provide exposure to the event via our Media or events”',
];

const Header = ({ onAnchorClick }) => {
  return (
    <Container>
      <Shapes>
        <Shape1 src="/static/shapes/get_involved/shape-5.svg" alt="Background shape" />
        <Shape2 src="/static/shapes/get_involved/shape-header-hero1.svg" alt="Background shape" />
        <Tagline>Get involved</Tagline>
      </Shapes>
      <Info>
        <Link to={'/involved/#onboard'} onClick={() => onAnchorClick('onboard')}>
          <SubLink>{'Onboard the Data Marketplace'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/involved/#signup'} onClick={() => onAnchorClick('signup')}>
          <SubLink>{'Sign Up'.toUpperCase()}</SubLink>
        </Link>
        <Link
          to={'/involved/#joint-development'}
          onClick={() => onAnchorClick('joint-development')}>
          <SubLink>{'Joint Use Case Development'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/involved/#cooperation'} onClick={() => onAnchorClick('cooperation')}>
          <SubLink>{'Call for Cooperation'.toUpperCase()}</SubLink>
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

  onScrollToTop() {
    const target = document.querySelector('#main');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render() {
    const { anchor } = this.state;
    return (
      <Main id="main">
        <MiniHeader />
        <Header onAnchorClick={this.onAnchorClick} />
        <Heading title="Onboard the Data Marketplace" id="onboard" anchor={anchor} />
        <ImgContainer>
          <Image
            width={30}
            src="/static/illustrations/onboarding.png"
            alt="IOTA process illustration"
          />
        </ImgContainer>
        <Content content={content1} />
        <TitleWrapper>
          <H2>Why join the Data Marketplace?</H2>
        </TitleWrapper>
        <WhyJoin />
        <FormContainer>
          <Introduction>
            <IntroductionHeader>
              <H2>Signing up</H2>
              <Arrow src="/static/icons/get_involved/arrow.png" alt="sign up" />
            </IntroductionHeader>
            <p>Please submit the form to download our technical onboarding guideline.</p>
          </Introduction>
          <Form anchor={anchor} />
        </FormContainer>

        <Heading title="Joint Use Case Development" id="joint-development" anchor={anchor} />
        <ImgContainer>
          <Image
            width={20}
            src="/static/illustrations/joint_use_case_dev.png"
            alt="IOTA process illustration"
          />
        </ImgContainer>
        <Content content={content2} />
        <ContentOuterWrapper>
          <ContentInnerWrapper>
            <Content content={content3} />
            <List items={characteristics} />
            <Content content={content4} />
          </ContentInnerWrapper>
        </ContentOuterWrapper>

        <Heading
          title="Call for Cooperation: Data Marketplace virtual hackathon"
          id="cooperation"
          anchor={anchor}
        />
        <ImgContainer>
          <Image src="/static/illustrations/hackathon.png" alt="IOTA process illustration" />
        </ImgContainer>
        <Content content={content5} />
        <Cards items={examples} />
        <Carousel items={examples} />
        <Content content={content6} />
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

const ContentOuterWrapper = styled.div`
  background-image: linear-gradient(to bottom, #f1f6f9, #eaf0f4);
  transform: skewY(4deg);
  margin: 40px 0 60px;
`;

const ContentInnerWrapper = styled.div`
  transform: skewY(-4deg);
  display: flex;
  flex-direction: column;
  padding: 40px 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  max-width: 1170px;
  padding: 0 20px;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Introduction = styled.div`
  width: 35%;
  padding: 130px 25px 0 0;

  @media (max-width: 900px) {
    width: 100%;
    text-align: center;
    padding: 0 0 30px;
  }
`;

const IntroductionHeader = styled.div`
  position: relative;
`;

const H2 = styled.h2`
  font-size: 24px;
  font-weight: normal;
  color: #292929;
  padding-bottom: 50px;

  @media (max-width: 900px) {
    padding-bottom: 20px;
  }
`;

const Arrow = styled.img`
  position: absolute;
  right: -70px;
  top: -45px;
  width: 80%;

  @media (max-width: 1150px) {
    top: -25px;
    width: 70%;
  }

  @media (max-width: 1000px) {
    right: -50px;
    top: -13px;
    width: 63%;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: ${props => (props.width ? `${props.width}%` : '35%')};
  height: 25%;
  padding: 10px 0;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 100px;
`;

const TitleWrapper = styled.div`
  margin-top: 30px;
  text-align: center;

  @media (max-width: 767px) {
    margin-top: 60px;
  }
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
