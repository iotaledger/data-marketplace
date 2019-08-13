import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BurgerMenu from '../components//header/burger';
import MiniHeader from '../components/header/mini-header';
import Content from '../components/content';
import List from '../components/content/list';
import Sensors from '../components/example-sensors';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import Cookie from '../components/cookie';

const contentIntroduction1 = {
  text: `In this PoC, sensor owners onboard a new sensor and use a script provided by IOTA to submit sensor data to the Tangle. All data packets are securely stored and each packet is additionally encrypted with strong randomly generated password.
<br />A price in IOTA Tokens can be defined, at which the data source will be “sold”.
<br /><br />Data sources are accessible through the main website and referenced through a geomap or a list. These are available after approval from IOTA team.
<br />Visitors of the website can select data sources and access the data sets directly from the browser after purchasing the sensor data.`,
};

const contentIntroduction2 = {
  text: `Data sources can be paid in IOTA Tokens.
<br />In this PoC a new user’s wallet is generated for every new user and filled up with 10,000,000 virtual IOTA tokens which can then be used to acquire data. Virtual Tokens can not be transferred to a different wallet or exchanged to any other virtual or fiat currency.
<br /><br />When purchase request is started, user’s web browser runs an algorithm called Proof-of-Work to contribute to Tangle integrity. Once completed, the transaction is submitted to the IOTA ledger.
<br />After the purchase is verified, IOTA tokens are transferred from the user’s wallet to a sensor owner’s wallet and a new balance is updated.
<br />The payment is verified and data is then streamed from the Tangle using the Masked Authenticated Messaging (MAM) to emit and secure the data stream.
<br /><br />The PoC runs on a Devnet and therefore is only a simulation using virtual IOTA token with no real value.`,
};

const content1 = {
  id: 'devnet',
  img: '/static/icons/proof_of_concept/icon-1.svg',
  title: 'The Devnet, also known as Testnet',
  text: `Aside from the mainnet, the IOTA Foundation operates a separate Tangle network called <a href="https://blog.iota.org/first-of-the-new-testnets-live-f8f41b99e9a3">“the Devnet”</a>. It is a version of the Tangle meant for development and testing purposes.
<br /><br />The Devnet runs the latest stable version of IRI, and allow developers to work on their apps without getting in their way — or costing them any real tokens.
<br /><br />Read more about the Devnet <a href="https://blog.iota.org/first-of-the-new-testnets-live-f8f41b99e9a3">here</a>.`,
};

const content2 = {
  id: 'mam',
  img: '/static/icons/proof_of_concept/icon-2.svg',
  title: 'Masked Authenticated Messaging (MAM)',
  text: `Masked Authenticated Messaging (MAM) is a second layer data communication protocol which adds functionality to emit and access encrypted data stream, like RSS, over the Tangle (IOTA’s distributed ledger) regardless of the size or cost of device. IOTA’s consensus protocol adds integrity to these message streams. Given these properties, MAM fulfills an important need in industries where integrity and privacy are required.
<br /><br />MAM uses Encrypted Messaging Streams, to emit and access a forward-secret and encrypted data stream over the Tangle.
<br /><br />Masked Authenticated Messaging allow for public or encrypted messaging streams to be published to the Tangle.
<br />These streams can be read back by anyone who has access to the Ledger, and anyone who has the encryption key. These message streams are signed so you are also able to attest to the authenticity of the data.
<br />Current MAM is written in RUST with bindings for Javascript and Java.
<br /><br />In the Data Marketplace implementation, each data packet is encrypted with it's own randomly generated encryption key. All keys are securely stored in our cloud backend system (powered and secured by Google for this first version).
<br /><br />In IOTA, a user or sensor can publish a message at any time. They only need to conduct a small amount of <a href="https://docs.iota.org/docs/the-tangle/0.1/concepts/proof-of-work">“Proof-of-Work”</a>* to allow the data to propagate through the network.
<br /><br /><strong>* Proof of Work (PoW)</strong> - An algorithm which prevents Denial of Service and spam attacks on a network. a computationally hard puzzle to solve, but easy to verify. IOTA uses a <a href="https://en.wikipedia.org/wiki/Hashcash">Hashcash</a> based puzzle.
<br /><br />Since these messages are part of the distributed ledger, they both contribute to the security of the network by increasing total hashing power and benefit from the data integrity properties of the network as other transactions continue to indirectly reference them.
<br /><br />Read more about the MAM <a href="https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e">here</a>.`,
};

const content3 = {
  id: 'payment',
  img: '/static/icons/proof_of_concept/icon-3.svg',
  title: 'Payment',
  text: `Data can be decrypted if payment is made. Price of the data stream is defined by sensor owner, and usually set between 1000 and 50000 IOTAs.
<br /><br />A buyer can ”fund” the wallet for free and will be granted with 10,000,000 virtual IOTAs, which he/she can spend exclusively for purchasing sensor data.
<br /><br /><strong>Important note for data stream purchasers:</strong> please note that these are not real IOTAs. The current balance can’t currently be topped up or transferred to another wallet address. The only valid operation is purchasing of the sensor data.
<br /><br /><strong>Important note for sensor owners:</strong> please note that received tokens are not real IOTAs. The collected balance can’t currently be withdrawn or transferred to another wallet address.
<br /><br />Beyond the current PoC, commercial data marketplaces will integrate with customers’ existing wallets, where real IOTA tokens will be transferred from data buyers to sensor owners.
<br /><br />After the buyers clicks on the “Purchase access” button, the sensor is added to the list of your purchased data streams. In the background the <a href="https://docs.iota.org/docs/the-tangle/0.1/concepts/proof-of-work">“Proof-of-Work”</a> is run to ensure the data integrity in the Tangle. This operation can take up to 60 seconds depending on the buyers computer and should not be interrupted by page reload.`,
};

const content4 = {
  id: 'storage',
  img: '/static/icons/proof_of_concept/icon-4.svg',
  title: 'Data storage in the Cloud',
  text: `The Data Marketplace PoC uses a cloud backend service provided by Google Firebase. All information is stored securely and confidentially. Google cloud services are used for user authentication and access rights management.
<br />All other information is currently stored in the Firebase cloud database as well, but can be easily migrated to any other cloud provider like Amazon AWS or Microsoft Azure.
<br />Frontend application communicates with the cloud backend service over APIs, which makes the entire backend interchangeable.`,
};

const content5 = {
  id: 'streaming',
  title: 'Data Streaming',
  img: '/static/icons/proof_of_concept/icon-5.svg',
  text: `New data packets can be added with a recommended minimum time interval of 5-10 min. More frequent additions are possible, but you need to keep in mind that <a href="https://docs.iota.org/docs/the-tangle/0.1/concepts/proof-of-work">“Proof-of-Work”</a> functionality might require to run up to 60 seconds for every new packet.
<br /><br />A Publish Script, provided with every onboarded sensor, contains preconfigured examples on how to send sensor data packages from a static file, database, remote server using API. the script can be run in a loop with defined time interval in order to ensure continuous streaming.
<br /><br />Data readings should be timed between 5 to 10 minutes. More regular readings (every minute) are also possible, but not recommended.`,
};

const content6 = {
  id: 'data',
  img: '/static/icons/proof_of_concept/icon-6.svg',
  title: 'Which data',
  text: `The Data Marketplace is not just aimed at IoT data, an example could be financial data from an API could also be stored and sold on the marketplace.
<br /><br />Existing functional examples of MAM being utilised on embedded devices.
<br />One can create portable weather stations, proximity beacons, vehicle locators and many other nifty sensor applications that report telemetry to a limited audience via the tangle or receive commands through a MAM stream.`,
};

const content7 = {
  text: `Other concepts that would find a great advantage in MAM include transmitting remote control commands and orchestrating updates.
<br /><br />Being able to secure data’s integrity and control its access management is a prerequisite for things like Over-The-Air updates(OTA), Fog Analytics, End-to-End verifiable Supply Chains, Automated Insurance and so much more.
<br /><br />If you do not have a sensor to utilize, but instead want to sell API data: feel free to do so!`,
};

const content8 = {
  text: `The Masked Authenticated Messaging (MAM) module is used to ensure encrypted messaging, ensuring security and privacy despite the permissionless nature of the IOTA Tangle.
<br /><br />This experiment runs on the IOTA testnet and runs IOTA testnet tokens which do not have real value. No real world payments or other real world financial consequences result from the current proof-of-concept and experiment made available online.
<br /><br />All data being contributed to this proof of concept is either non-sensitive data of which the participants are the authorized owners and/or is publicly available data which the participants may freely choose to share. Participation in the IOTA Data Marketplace takes place on a voluntary, non-contractual basis. Participants may choose to discontinue their participation at any time.`,
};

const content9 = {
  id: 'sensors',
  title: 'Sensors',
  text: `The Data Marketplace is agnostic to the sensors and the data that you connect to it. Any sensor that has the ability to transmit data and has an easy way to get regular data readings (e.g. through an API) can be used for the Data Marketplace. In order to submit the data to the marketplace, all you have to do is execute a NodeJS script.`,
};

const content10 = {
  title: 'Work in progress functionality',
  text: `The PoC released on github is a first version of an opensource development that will continue onwards and feed from the inputs from the community. Work in progress includes:`,
};

const content11 = {
  id: 'opensource',
  title: 'Opensource Code',
  text: `The code developed during the initiative will be opensourced <a href="https://github.com/iotaledger/data-marketplace">here</a> in order to allow the innovation community to build further solutions. A dedicated chat channel in <a href="https://discord.iota.org/">Discord</a> is made available <a href="https://discordapp.com/channels/397872799483428865/400989166114177034">here</a> to developers.`,
};

const limitations = [
  'Maximum size of a single data packet is limited to 1kb',
  'Google Mail or Google Business account required in order to onboard a new sensor',
  'Number of sensors per account is limited, but can be adjusted upon request',
  'New sensors require manual approval from IOTA team in order to be visible in the list/sensor map',
  'Virtual payments, no real tokens can be sent or received. No transfer to a different wallet possible',
  'No tokens to fiat currency exchange',
];

const workInProgress = [
  'Custom wallet configuration',
  'Migration over to Mainnet, real wallets and payments',
  'Modifying the data stream price, dynamic pricing',
  'Modifying of the sensor data fields',
  'Latest data updates from device, visible prior to purchase',
  'External data storage of data (interchangeable cloud providers)',
  'Visualisation / graph tools',
];

const Header = ({ onAnchorClick }) => {
  return (
    <Container>
      <Shapes>
        <Shape1 src="/static/shapes/proof_of_concept/shape-5.svg" alt="Background shape" />
        <Tagline>Proof of Concept</Tagline>
        <SubTagline>Technical specifications</SubTagline>
      </Shapes>
      <Info>
        <Link to={'/specs/#devnet'} onClick={() => onAnchorClick('devnet')}>
          <SubLink>{'The Devnet'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/specs/#mam'} onClick={() => onAnchorClick('mam')}>
          <SubLink>{'Masked Authenticated Messaging'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/specs/#payment'} onClick={() => onAnchorClick('payment')}>
          <SubLink>{'Payment'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/specs/#storage'} onClick={() => onAnchorClick('storage')}>
          <SubLink>{'Data storage in the Cloud'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/specs/#streaming'} onClick={() => onAnchorClick('streaming')}>
          <SubLink>{'Data Streaming'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/specs/#data'} onClick={() => onAnchorClick('data')}>
          <SubLink>{'Which data'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/specs/#sensors'} onClick={() => onAnchorClick('sensors')}>
          <SubLink>{'Sensors'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/specs/#limitations'} onClick={() => onAnchorClick('limitations')}>
          <SubLink>{'Limitations of the current version'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/specs/#opensource'} onClick={() => onAnchorClick('opensource')}>
          <SubLink>{'Opensource Code'.toUpperCase()}</SubLink>
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
    ReactGA.pageview('/specs');
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
        <Content content={contentIntroduction1} />
        <ImgContainer>
          <Image
            width={400}
            src="/static/illustrations/vision.png"
            alt="Proof of Concept Illustration"
          />
        </ImgContainer>
        <Content content={contentIntroduction2} />
        <Content content={content1} anchor={anchor} />
        <Content content={content2} anchor={anchor} />
        <Shape3 src="/static/shapes/proof_of_concept/shape-5.svg" alt="Background shape" />
        <Content content={content3} anchor={anchor} />
        <ImgContainer>
          <Image src="/static/illustrations/proof_of_concept.png" alt="IOTA Proof of Concept" />
        </ImgContainer>
        <Content content={content4} anchor={anchor} />
        <Content content={content5} anchor={anchor} />
        <Content content={content6} anchor={anchor} />
        <ImgContainer>
          <Image
            src="/static/illustrations/use_case_ideation.png"
            alt="IOTA process illustration"
          />
        </ImgContainer>
        <Content content={content7} />
        <ImgContainer>
          <Image width={400} src="/static/illustrations/MAM.png" alt="IOTA process illustration" />
        </ImgContainer>
        <Content content={content8} />
        <Sensors content={content9} anchor={anchor} />
        <List
          items={limitations}
          id="limitations"
          title="Limitations of the current version"
          anchor={anchor}
        />
        <ContentOuterWrapper>
          <ContentInnerWrapper>
            <Content content={content10} />
            <List items={workInProgress} />
          </ContentInnerWrapper>
        </ContentOuterWrapper>
        <Content content={content11} anchor={anchor} />
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
  width: ${props => (props.width ? `${props.width}px` : '350px')};
  @media (max-width: 650px) {
    width: ${props => (props.width ? `${props.width * 0.8}px` : '250px')};
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 40px;

  @media (max-width: 660px) {
    background-image: url(/static/shapes/proof_of_concept/shape-header-hero.svg);
    background-repeat: no-repeat;
    background-size: 566px 422px;
    background-position-y: 30px;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 560px) {
    background-position-x: -25px;
    background-position-y: 20px;
  }

  @media (max-width: 420px) {
    background-position-x: -25px;
    background-position-y: 40px;
    padding-bottom: 45px;
  }
`;

const ContentOuterWrapper = styled.div`
  background-image: linear-gradient(to bottom, #f1f6f9, #eaf0f4);
  transform: skewY(2deg);
  margin: 40px 0 60px;
`;

const ContentInnerWrapper = styled.div`
  transform: skewY(-2deg);
  display: flex;
  flex-direction: column;
  padding: 40px 0 60px;
`;

const Info = styled.div`
  width: 40%;
  max-width: 600px;
  padding-left: 50px;
  @media (max-width: 1120px) {
    padding: 0;
    width: 50%;
  }
  @media (max-width: 960px) {
    padding: 0;
    width: 55%;
  }
  @media (max-width: 760px) {
    margin-left: 10px;
  }
  @media (max-width: 700px) {
    max-width: 400px;
  }
  @media (max-width: 660px) {
    padding: 30px 0 35px;
    margin-left: 99px;
    width: auto;
  }
  @media (max-width: 560px) {
    padding: 30px 0 35px;
    margin-left: 63px;
  }
  @media (max-width: 420px) {
    padding: 63px 0 0;
    max-width: 305px;
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

  @media (max-width: 767px) {
    padding: 7px 0 0;
  }

  @media (max-width: 660px) {
    color: #ffffff;
    opacity: 0.7;
    line-height: 20px;
    margin: 15px 0;
  }

  @media (max-width: 420px) {
    margin: 8px 0;
  }
`;

const Tagline = styled.h2`
  display: none;
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 660px) {
    display: block;
    position: absolute;
    top: 108px;
    right: 7vw;
    color: #4e5a61;
  }
  @media (max-width: 560px) {
    right: 3.5vw;
    top: 88px;
  }
`;

const SubTagline = styled.p`
  display: none;
  font-size: 16px;
  font-weight: 400;

  @media (max-width: 660px) {
    display: block;
    position: absolute;
    top: 142px;
    right: 6vw;
    color: #4e5a61;
  }
  @media (max-width: 560px) {
    right: 2vw;
    top: 115px;
  }
`;

const Shapes = styled.div`
  width: 60%;

  background-image: url(/static/shapes/proof_of_concept/shape-header-hero-text.svg);
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
    width: 50%;
    background-size: 437px 260px;
  }

  @media (max-width: 999px) {
    width: 45%;
    background-size: 265px 260px;
  }

  @media (max-width: 860px) {
    width: 50%;
    background-size: 237px 248px;
  }

  @media (max-width: 767px) {
    width: 45%;
    background-size: 250px 216px;
    background-position-x: 5px;
  }
`;

const Shape = styled.img`
  position: absolute;
  z-index: -10;
`;

const Shape1 = styled(Shape)`
  top: 180px;
  right: 61vw;
  width: 20%;

  @media (max-width: 1220px) {
    right: 63vw;
    width: 24%;
  }

  @media (max-width: 1120px) {
    right: 67vw;
  }

  @media (max-width: 999px) {
    right: 70vw;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const Shape3 = styled(Shape)`
  z-index: 1;
  top: 200%;
  left: -8vw;
  width: 24%;
`;
