import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BurgerMenu from '../components//header/burger';
import MiniHeader from '../components/header/mini-header';
// import Cards from '../components/feature-section/feature-cards';
// import Carousel from '../components/carousel';
import Content from '../components/content';
import Form from '../components/form';
import Heading from '../components/content/heading';
import List from '../components/content/list';
import WhyJoin from '../components/feature-section/why-join';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import Cookie from '../components/cookie';

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

// const content5 = {
//   text: `The Foundation aims at launching in Q3/4 2018 a global virtual initiative to catalyse co-creation and bring developers and organisations to develop and showcase together their capabilities and creativity. New solutions across industries and geographies will be developed as hybrid, addons or use case proof of concept on top of an <a href="https://github.com/iotaledger/data-marketplace">opensource</a> version of the Data Marketplace.
// <br /><br />We are currently gathering interest from our ecosystem and potential partners willing to help shape this unique initiative. Examples include:`,
// };
//
// const content6 = {
//   text: `Please submit your interest at <a href="mailto:datamarketplace@iota.org">datamarketplace@iota.org</a> preferably by 1st Oct.`,
// }; 

const characteristics = [
  'Ambition to explore and develop new business models with the backing of management',
  'Access to inhouse understanding of DLT / Blockchain and built initial hypotheses of use cases to be explored. Onboarding the Data Marketplace helps to catalyse this process',
  'Ready to provide human resources, especially in IT capabilities',
  'Access to tangible assets (facilities, lab, connected hardware…) available for testbed piloting',
  'Embraces open innovation principles. Openness to publish/showcase publicly',
];

// const examples = [
//   '“We are a Blockchain Innovation Cluster and would like to train prospective participants with IOTA before the launch of the challenge.”',
//   '“My organisation is a leading player in our region and would like to host a physical hub so that participants meet face to face during the event”',
//   '“Can my organisation provide sponsorship for a theme / Problem to be solved?”',
//   '“Can we incentivize participants to use our IoT and connected devices as part of their solutions?”',
//   '“We would like to provide exposure to the event via our Media or events”',
// ];

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
        <Link
          to={'/involved/#joint-development'}
          onClick={() => onAnchorClick('joint-development')}>
          <SubLink>{'Joint Use Case Development'.toUpperCase()}</SubLink>
        </Link>
        {
        // <Link to={'/involved/#cooperation'} onClick={() => onAnchorClick('cooperation')}>
        //   <SubLink>{'Virtual Hackathon Cooperation'.toUpperCase()}</SubLink>
        // </Link>
        }
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
    ReactGA.pageview('/involved');
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
        <Heading title="Onboard the Data Marketplace" id="onboard" anchor={anchor} />
        <ImgContainer>
          <Image
            width={250}
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
            <p>Please submit the form to flag your interest in onboarding the Data Marketplace. We continue to onboard selectively organisations with the ambitions, capabilities and resources to contribute to our open ecosystem and co-creation initiatives.</p>
          </Introduction>
          <Form />
        </FormContainer>

        <Heading title="Joint Use Case Development" id="joint-development" anchor={anchor} />
        <ImgContainer>
          <Image
            width={200}
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

        {
          // <Heading
          //   title="Call for Cooperation: Data Marketplace virtual hackathon"
          //   id="cooperation"
          //   anchor={anchor}
          // />
          // <ImgContainer>
          //   <Image src="/static/illustrations/hackathon.png" alt="IOTA process illustration" />
          // </ImgContainer>
          // <Content content={content5} />
          // <Cards items={examples} />
          // <Carousel items={examples} />
          // <Content content={content6} />
        }
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
  transform: skewY(2deg);
  margin: 40px 0 0;
`;

const ContentInnerWrapper = styled.div`
  transform: skewY(-2deg);
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
  height: 100%;
`;

const Image = styled.img`
  height: 100%;
  padding: 10px 0;
  width: ${props => (props.width ? `${props.width}px` : '300px')};
  @media (max-width: 650px) {
    width: ${props => (props.width ? `${props.width * 0.8}px` : '200px')};
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 100px;
  position: relative;

  @media (max-width: 660px) {
    background-image: url(/static/shapes/get_involved/shape-header-hero1.svg);
    background-repeat: no-repeat;
    background-size: 585px 364px;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 430px) {
    background-size: 584px 450px;
    margin-bottom: 20px;
    margin-top: 30px;
  }
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
  padding: 87px 0 80px 100px;
  @media (max-width: 1120px) {
    max-width: 420px;
    padding: 30px 0 40px;
    margin-left: 65px;
    width: 50%;
  }
  @media (max-width: 820px) {
    width: 60%;
    padding-bottom: 0;
  }
  @media (max-width: 767px) {
    width: 70%;
    padding-bottom: 0;
  }
  @media (max-width: 700px) {
    width: 85%;
    padding: 30px 0 0;
  }
  @media (max-width: 430px) {
    padding-top: 65px;
    margin-left: 35px;
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
  line-height: 1.48;
  max-width: 400px;
  margin-bottom: 40px;
  color: #fff;
  font-size: 42px;
  font-weight: 400;
  letter-spacing: normal;
  text-align: center;
  position: absolute;
  top: 145px;
  left: 31vw;

  @media (min-width: 1700px) {
    left: 19vw;
  }

  @media (max-width: 1120px) {
    left: 30vw;
  }

  @media (max-width: 1050px) {
    left: 29vw;
  }

  @media (max-width: 990px) {
    font-size: 30px;
    top: 100px;
    left: 22vw;
  }

  @media (max-width: 760px) {
    left: 13vw;
  }

  @media (max-width: 660px) {
    top: -20px;
    text-align: right;
    right: 2vw;
    color: #4e5a61;
  }
`;

const Shapes = styled.div`
  width: 60%;
`;

const Shape = styled.img`
  position: absolute;
  z-index: -10;
`;

const Shape1 = styled(Shape)`
  transform: skew(-65deg, 66deg);
  top: 154px;
  left: 18vw;
  width: 7%;

  @media (min-width: 1700px) {
    left: 10vw;
  }

  @media (max-width: 900px) {
    left: 10vw;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const Shape2 = styled(Shape)`
  transform: skew(-14deg, 195deg);
  top: 30px;
  left: 25vw;
  width: 33%;
  max-width: 540px;

  @media (min-width: 1700px) {
    left: 15vw;
  }

  @media (max-width: 990px) {
    left: 15vw;
  }

  @media (max-width: 760px) {
    left: 8vw;
    width: 35%;
  }

  @media (max-width: 660px) {
    display: none;
  }
`;
