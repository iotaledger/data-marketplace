import React from 'react';
import styled from 'styled-components';
import MiniHeader from '../components/header/mini-header';
import Content from '../components/content';
import Features from '../components/feature-section';
import Footer from '../components/footer';

const content1 = {
  text: `IOTA is a not for profit Foundation developing the Tangle, a new opensource permissionless Distributed Ledger Technology fit for the IoT / M2M economy. As such, IOTA seeks to enable a large spectrum of innovation across multiple industries and geographies so as to catalyse the adoption of the IOTA Tangle in to the Backbone for the Internet of (every)Things.`,
};

const content2 = {
  title: 'A growing open innovation ecosystem',
  text: `The Data marketplace PoC is used to demystify IOTA via a  very simple experiment. Activities were driven via webinars and two workshops taking place in Oslo (Trusted IoT) and Berlin (Personal Data). Participants to the initiative are also joining a growing ecosystem of corporate institutions and not-for-profit organisations interested in exploring together the potential of IOTA.`,
};

const content3 = {
  text: `The <a href="#/home#participants">Participants</a> to the initiative, 70+ as of july 2018, come from many different sectors including Mobility, Energy, Agriculture, Real Estate, eHealth, Smart Manufacturing, Supply chain, Financial services, Semiconductors, IT integrators, Consulting, Universities, Industry clusters.`,
};

const content4 = {
  title: 'Business model innovation',
  text: `The IOTA Tangle represents a great opportunity to reinvent business models in the M2M/IoT realm. This can apply to autonomous economic agents (ex: autonomous EVs and drones) in smart cities`,
};

const content5 = {
  text: `Because much of the innovation is handling personal data, e-privacy and GDPR aspects are becoming a key success factor for future data marketplaces. Dialogue with participants contributed to shaping a new lense on the opportunity landscape we call “Personal Data” where digital identity, personal data management and human centric innovation can be shaped with IOTA.
<br /><br />At the intersection of the Economy of Things and Personal Data, the Smart Sharing Economy represents a very large potential area of innovation for IOTA which can be applied to context such as smart communities and cities.
<br /><br />Going forward the IOTA Foundation decided to further strengthen its proactive engagement with stakeholders working with the above cross-vertical arenas.`,
};

const content6 = {
  title: 'Follow-up initiatives',
  text: `Follow-up initiatives take various shape including ideation workshops, joint use case development or hackathons. Here are a few initiatives as examples:`,
};

export default () => (
  <Main>
    <MiniHeader />
    <Content content={content1} />
    <Content content={content2} />
    <ImgContainer>
      <Image src="/static/illustrations/exploring.png" alt="Open innovation ecosystem" />
    </ImgContainer>
    <Content content={content3} />
    <Content content={content4} />
    <ImgContainer>
      <Image
        src="/static/illustrations/business_model_innovation.png"
        alt="Business model innovation"
      />
    </ImgContainer>
    <Content content={content5} />
    <Content content={content6} />
    <Features />
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
  width: 50%;
  height: 50%;
  padding: 10px 0;
`;
