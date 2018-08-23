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
        text="Run a free to join and simple trial at your office to explore technically the data marketplace potential"
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
  @media (max-width: 760px) {
    margin: 40px 0 20px;
  }
`;

const InfoRow = styled.div`
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  display: flex;
  justify-content: space-evenly;
`;
