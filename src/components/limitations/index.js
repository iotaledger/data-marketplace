import React from 'react';
import styled from 'styled-components';
import List from '../content/list';

const limitations = [
  'Maximum size of a single data packet is limited to 1kb',
  'Google Mail or Google Business account required in order to onboard a new sensor',
  'Number of sensors per account is limited, but can be adjusted upon request',
  'New sensors require manual approval from IOTA team in order to be visible in the list/sensor map',
  'Virtual payments, no real tokens can be sent or received. No transfer to a different wallet possible',
  'No tokens to fiat currency exchange',
];

export default class Limitations extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.anchor) {
      const target = document.querySelector(`#${nextProps.anchor}`);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render() {
    return (
      <Container id="limitations">
        <ListContainer>
          <List items={limitations} title="Limitations of the current version" />
        </ListContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  align-self: center;
  width: 100%;
  max-width: 724px;
  justify-content: center;
  height: 470px;

  background-image: url(/static/icons/proof_of_concept/globe.svg);
  background-repeat: no-repeat;
  background-size: 800px 500px;
  background-position: center;

  @media (max-width: 767px) {
    background-size: 800px 450px;
  }

  @media (max-width: 660px) {
    background-size: 800px 400px;
  }

  @media (max-width: 610px) {
    background-image: none;
  }
`;

const ListContainer = styled.div`
  display: none;

  @media (max-width: 610px) {
    display: flex;
  }
`;
