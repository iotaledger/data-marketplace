import React from 'react';
import styled from 'styled-components';
import Card from '../content/card';

export default props => (
  <Container>
    <InfoRow>
      <Card
        imageSrc="/static/icons/get_involved/icon-1.svg"
        imageAlt="Accelerate learning"
        text="Accelerate learning about Distributed Ledger Technologies and IOTA"
      />
      <Card
        imageSrc="/static/icons/get_involved/icon-2.svg"
        imageAlt="simple trial"
        text="Run a free to join and simple trial at your office to explore technically the Data Marketplace potential"
      />
      <Card
        imageSrc="/static/icons/get_involved/icon-3.svg"
        imageAlt="new business models"
        text="Catalyse the exploration of new business models with your colleagues via structured experimentation"
      />
      <Card
        imageSrc="/static/icons/get_involved/icon-4.svg"
        imageAlt="open innovation"
        text="Initiate open innovation initiatives with the rest of the IOTA ecosystem"
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
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 960px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;
