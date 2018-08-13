import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import Features from '../components/feature-section';
import Partners from '../components/partners';
import Content from '../components/content';
import Footer from '../components/footer';

const links = [
  { link: 'demo', text: 'Try out the Data Marketplace demo' },
  { link: 'specs', text: 'Proof of Concept - Technical specifications' },
  { link: 'business', text: 'Co-creation ecosystem - Exploring together new business models' },
  { link: 'involved', text: 'Get involved' }
];

export default () => (
  <Main>
    <Header links={links} />
    <Features />
    <Content />
    <Partners />
    <Footer />
  </Main>
);

const Main = styled.div`
  overflow-x: hidden;
`;
