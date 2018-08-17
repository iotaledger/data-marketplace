import React from 'react';
import styled from 'styled-components';
import MiniHeader from '../components/header/mini-header';
import Content from '../components/content';
import Form from '../components/form';
import Heading from '../components/content/heading';
import List from '../components/content/list';
import Footer from '../components/footer';

const contentSigningUp = {
  title: 'Signing up',
  text: 'Please submit the form below to download our technical onboarding guideline.',
};

const content1 = {
  text: `IOTA is now streamlining open access to the demo and will continue signing up organisations to grow the co-creation ecosystem.`,
};

const content2 = {
  text: `Organisations can team up to develop use cases together. IOTA will support by streamlining access to information and providing guidance in developing on IOTA Tangle.
<br /><br />Partners and initiatives with the following characteristics are particularly attractive to the IOTA Foundation:`,
};

const content3 = {
  text: `Please send us an email at <a href="mailto:datamarketplace@iota.org">datamarketplace@iota.org</a>`,
};

const content4 = {
  text: `The Foundation aims at launching in Q3/4 2018 a global virtual initiative to catalyse co-creation and bring developers and organisations to develop and showcase together their capabilities and creativity. New solutions across industries and geographies will be developed as hybrid, addons or use case proof of concept on top of an <a href="https://github.com/iotaledger/data-marketplace">opensource</a> version of the Data marketplace.
<br /><br />We are currently gathering interest from our ecosystem and <a href="#/home#participants">potential partners</a> willing to help shape this unique initiative. Examples include:`,
};

const content5 = {
  text: `Please submit your interest at <a href="mailto:datamarketplace@iota.org">datamarketplace@iota.org</a>preferably by 31st August.`,
};

const whyJoin = [
  'Accelerate learning about Distributed Ledger Technologies and IOTA',
  'Run a free to join and simple trial at your office to explore technically the data marketplace potential',
  'Catalyse the exploration of new business models with your colleagues via structured experimentation',
  'Initiate open innovation initiatives with the rest of the IOTA ecosystem',
];

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

export default () => (
  <Main>
    <MiniHeader />
    <Heading title="Onboard the Data Marketplace" />
    <ImgContainer>
      <Image src="/static/illustrations/onboarding.png" alt="IOTA process illustration" />
    </ImgContainer>
    <Content content={content1} />
    <List items={whyJoin} title="Why join the Data Marketplace?" />
    <Content content={contentSigningUp} />
    <Form />

    <Heading title="Joint Use Case Development" />
    <ImgContainer>
      <Image src="/static/illustrations/joint_use_case_dev.png" alt="IOTA process illustration" />
    </ImgContainer>
    <Content content={content2} />
    <List items={characteristics} />
    <Content content={content3} />

    <Heading title="Call for Cooperation: Data Marketplace virtual hackathon" />
    <ImgContainer>
      <Image src="/static/illustrations/hackathon.png" alt="IOTA process illustration" />
    </ImgContainer>
    <Content content={content4} />
    <List items={examples} />
    <Content content={content5} />
    <Footer />
  </Main>
);

const Main = styled.div`
  overflow-x: hidden;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 25%;
  height: 25%;
  padding: 10px 0;
`;
