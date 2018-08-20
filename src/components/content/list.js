import React from 'react';
import styled from 'styled-components';
import Heading from './heading';

export default ({ items, title }) => (
  <C>
    {title ? <Heading title={title} /> : null}
    <Ul>
      {items.map(item => (
        <Li key={item}>
          <SPAN dangerouslySetInnerHTML={{ __html: item }} />
        </Li>
      ))}
    </Ul>
  </C>
);

const C = styled.div`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -175px;
    left: 0;
    z-index: -10;
    // width: 100vw;
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

const Ul = styled.ul`
  @media (max-width: 760px) {
    flex-flow: row wrap;
    justify-content: center;
    max-width: 290px;
    margin-bottom: 20px;
  }
  max-width: 724px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  color: #cedbe2;
  display: flex;
  @media (max-width: 760px) {
    line-height: 26px;
  }

  &::before {
    content: '•';
    padding-right: 14px;
    padding-top: 4px;
    color: #009fff;
  }
`;

const SPAN = styled.span`
  @media (max-width: 1120px) {
    font-size: 16px;
    line-height: 27px;
    margin: 0 auto;
  }
  font-size: 17px;
  line-height: 32px;
  color: #4e5a61;
`;
