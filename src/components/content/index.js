import React from 'react';
import styled from 'styled-components';
import Heading from './heading';

export default ({ content: { title, text } }) => (
  <S>
    {title ? <Heading title={title} /> : null}
    <C>
      <P dangerouslySetInnerHTML={{ __html: text }} />
    </C>
  </S>
);

const S = styled.section`
  max-width: 724px;
  z-index: 10;
  padding-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  @media (max-width: 760px) {
    margin-bottom: -30px;
  }
`;

const C = styled.div`
  display: flex;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -175px;
    left: 0;
    z-index: -10;
    height: 210px;
    transform: skewY(6deg);
    background-color: #fff;
  }
  @media (max-width: 760px) {
    &::after {
      bottom: -65px;
    }
  }
`;

const P = styled.p`
  @media (max-width: 1120px) {
    font-size: 16px;
    line-height: 27px;
    margin: 0 auto;
  }
  font-size: 17px;
  line-height: 32px;
  color: #4e5a61;
  max-width: 724px;
`;
