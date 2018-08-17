import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import MiniHeader from '../components/header/mini-header';
import Header from '../components/header';
import Content from '../components/content';
import Partners from '../components/partners';
import Footer from '../components/footer';

const content1 = {
  text: `The IOTA Foundation launched in Q4 2017 a proof of concept and open innovation ecosystem called the Data Marketplace. The rationale and opportunity landscape related to this initiative is described in depth <a href="https://blog.iota.org/iota-data-marketplace-cb6be463ac7f">here</a>.
<br /><br />As of July 2018, the initiative produced a PoC available online and continued to onboard selectively organisations able to contribute to the ecosystem of participants. Mid 2018, more than 70 organisations have signed up to join the data marketplace.`,
};

const content2 = {
  text: `The IOTA Tangle is a secure data communication protocol and zero fee micro-transaction system for the IoT/M2M. It provides the means to develop new "smart" business models in the IoT, enabling connected devices and "machines" to share securely information based on a new framework of 'Trust in the Data' and also allow seamless transaction between IoT devices.
<br /><br />
The IOTA Data Marketplace is a simplified marketplace simulating how a connected device running the Tangle protocol can be paid instantly for sharing securely data over to a web browser. The Masked Authenticated Messaging (MAM) module is used to ensure encrypted messaging, thereby ensuring security and privacy despite the permissionless nature of the IOTA Tangle. This experiment runs on the IOTA testnet and runs IOTA testnet tokens which do not have real value. No real world payments or other real world financial consequences results from the current proof-of-concept and experiment made available online. All data being contributed to this proof of concept is either non-sensitive data of which the participants are the authorized owners and/or is publicly available data which the participants may freely choose to share. Participation in the IOTA Data Marketplace takes place on a voluntary, non-contractual basis. Participants may choose to discontinue their participation at any time.`,
};

const HomePage = props => (
  <Main>
    <MiniHeader />
    <Header />
    <Content content={content1} />
    <ImgContainer>
      <Image src="/static/illustrations/home1.png" alt="IOTA process illustration" />
    </ImgContainer>
    <Content content={content2} />
    <Partners anchor={props.location && props.location.hash} />
    <Footer />
  </Main>
);

export default withRouter(HomePage);

const Main = styled.div`
  overflow-x: hidden;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 50%;
  height: 50%;
  padding: 10px 0;
`;
