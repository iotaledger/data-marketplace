import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import Features from '../components/feature-section';
import Partners from '../components/partners';
import Content from '../components/content';
import Footer from '../components/footer';

const links = [
  { link: 'home', text: 'Data Marketplace Home' },
  { link: 'demo', text: 'Try out the Data Marketplace demo' },
  { link: 'business', text: 'Co-creation ecosystem - Exploring together new business models' },
  { link: 'involved', text: 'Get involved' }
];

const content1 = {
  title: 'BACKGROUND',
  text: `The IOTA Foundation launched in Q4 2017 a proof of concept and open innovation ecosystem called the Data Marketplace. The rationale and opportunity landscape related to this initiative is described in depth <a href="https://blog.iota.org/iota-data-marketplace-cb6be463ac7f">here</a>.
<br /><br />As of July 2018, the initiative produced a PoC available online at <a href="http://data.iota.org">http://data.iota.org</a> and continued to onboard selectively organisations able to contribute to the ecosystem of participants. Mid 2018, more than 70 organisations have signed up to join the data marketplace.`
}

const content2 = {
  title: 'THE PROOF OF CONCEPT',
  text: `The IOTA Tangle is a secure data communication protocol and zero fee micro-transaction system for the IoT/M2M. It provides the means to develop new "smart" business models in the IoT, enabling connected devices and "machines" to share securely information based on a new framework of 'Trust in the Data' and also allow seamless transaction between IoT devices.
<br /><br />
The IOTA Data Marketplace is a simplified marketplace simulating how a connected device running the Tangle protocol can be paid instantly for sharing securely data over to a web browser. The Masked Authenticated Messaging (MAM) module is used to ensure encrypted messaging, thereby ensuring security and privacy despite the permissionless nature of the IOTA Tangle. This experiment runs on the IOTA testnet and runs IOTA testnet tokens which do not have real value. No real world payments or other real world financial consequences results from the current proof-of-concept and experiment made available online. All data being contributed to this proof of concept is either non-sensitive data of which the participants are the authorized owners and/or is publicly available data which the participants may freely choose to share. Participation in the IOTA Data Marketplace takes place on a voluntary, non-contractual basis. Participants may choose to discontinue their participation at any time.`
}

export default () => (
  <Main>
    <Header links={links} />
    <Content content={content1} />
    <Content content={content2} />
    <Footer />
  </Main>
);

const Main = styled.div`
  overflow-x: hidden;
`;
