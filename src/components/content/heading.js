import React from 'react';
import styled from 'styled-components';

export default ({ title }) => (
  <H>
    <H3>{title}</H3>
  </H>
);

const H = styled.header`
  margin-bottom: 20px;
  width: 100%;
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: 100;
  line-height: 32px;
  margin-bottom: 12px;
  text-align: center;
  color: #009fff;
  @media (max-width: 760px) {
    font-size: 24px;
    margin-bottom: 0;
  }
`;
