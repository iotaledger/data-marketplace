import React from 'react';
import styled from 'styled-components';
import Card from '../content/card';

export default props => (
  <Container>
    <div>
      <Header>How it works?</Header>
      <Tagline>{''}</Tagline>
    </div>
    <InfoRow>
      <Card
        imageSrc="/static/illustrations/choose.svg"
        imageAlt="IOTA process illustration"
        heading="Choose"
        text="Pick a sensor from which you want to access the data from. Take a look at the map below and pick any type of sensor."
      />
      <Card
        imageSrc="/static/illustrations/pay.svg"
        imageAlt="IOTA process illustration"
        heading="Pay"
        text="For each sensor you can purchase direct access to the data stream. Thanks to the power of micropayments."
      />
      <Card
        imageSrc="/static/illustrations/access.svg"
        imageAlt="IOTA process illustration"
        heading="Access"
        text="Continuously access the data from the sensor and use that data to fuel your reports,
        applications and data analytics."
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

const Header = styled.h3`
  @media (max-width: 760px) {
    font-size: 24px;
    margin-bottom: 0;
  }
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  text-align: center;
  color: #009fff;
`;

const Tagline = styled.h4`
  @media (max-width: 760px) {
    font-size: 18px;
    line-height: 28px;
  }
  font-size: 19px;
  font-weight: 400;
  line-height: 33px;
  margin-bottom: 60px;
  text-align: center;
  color: #4e5a61;
`;

const InfoRow = styled.div`
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: none;
  }
  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
`;
