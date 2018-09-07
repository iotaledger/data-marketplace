import React from 'react';
import styled from 'styled-components';
import Card from '../content/card';

export default props => (
  <Container>
    <InfoRow>
      <Card
        imageSrc="/static/icons/business/icon-4.svg"
        imageAlt="Smart Sharing Economy"
        heading="Smart Sharing Economy"
        text="ElaadNL + Innoenergy + OBO in Smart Energy Community in Sweden"
        link="https://blog.iota.org/iota-partners-with-innoenergy-on-smart-energy-community-5dc483b42aa0"
        scale={95}
      />
      <Card
        imageSrc="/static/icons/business/icon-2.svg"
        imageAlt="Smart Farming"
        heading="Smart Farming"
        text="TINE, Norway’s leading dairy product cooperative, develops a data marketplace related to Milk production"
        link="https://premium.obforum.no/sensor"
      />
      <Card
        imageSrc="/static/icons/business/icon-3.svg"
        imageAlt="Smart Energy"
        heading="Smart Energy"
        text="+cityxchange, EU Horizon 2020 project with 7 smart cities and 30 partners"
        link="https://blog.iota.org/green-light-from-the-eu-commission-for-iota-and-the-european-smart-city-consortium-cityxchange-f7928aef33ac"
      />
      <Card
        imageSrc="/static/icons/business/icon-1.svg"
        imageAlt="Smart Buildings"
        heading="Smart Buildings"
        text="3for2 smart building in Singapore has been running an IOTA PoC"
        scale={95}
      />
      <Card
        imageSrc="/static/icons/business/icon-5.svg"
        imageAlt="SDK"
        heading="SDK"
        text="Nordic Semiconductor and NTNU onboard the Data Marketplace"
        link="https://blog.iota.org/nordic-semiconductor-and-ntnu-in-norway-explore-iota-and-the-data-marketplace-f9bc7efee3"
      />
      <Card
        imageSrc="/static/icons/business/icon-6.svg"
        imageAlt="Financial Services"
        heading="Financial Services"
        text="Financial services: DNB onboarding to explore Data Marketplace, personal data and Economy of Things"
        link="https://blog.iota.org/dnb-teams-up-with-iota-to-explore-the-economy-of-things-and-mydata-gdpr-as-an-opportunity-20c41461e3f5"
        scale={110}
      />
      <Card
        imageSrc="/static/icons/business/icon-7.svg"
        imageAlt="Workshops & Webinars"
        heading="Workshops & Webinars"
        text="2 webinars were organised on the Data Marketplace and the MAM module. Workshops were conducted in Oslo and Berlin on the topics of Trusted IoT and MyData/personal data"
      />
      <Card
        imageSrc="/static/icons/business/icon-8.svg"
        imageAlt="Hackathons"
        heading="Hackathons"
        text="IOTA participated in two hackathons where the Data Marketplace was used as basis/starting point"
        link="https://blog.iota.org/blockchaingers-2018-boosting-co-creation-with-iota-8086c215caad"
      />
      <Card
        imageSrc="/static/icons/business/icon-9.svg"
        imageAlt="Smart City Testbed"
        heading="Smart City Testbed"
        text="Initial work towards smart cities development are being triggered in Los Angeles at USC’s smart campus IoT Testbed, as proxy for a smart city"
        link="https://cci.usc.edu/"
      />
    </InfoRow>
  </Container>
);

const Container = styled.section`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  @media (max-width: 760px) {
    margin: 40px 0 20px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20px;

  @media (max-width: 960px) {
    justify-content: center;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;
