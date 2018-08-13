import React from 'react';
import styled from 'styled-components';

export default ({ items }) => (
  <Ul>
    {
      items.map(item =>
        <Li>
          <SPAN dangerouslySetInnerHTML={{ __html: item }} />
        </Li>
      )
    }
  </Ul>
);

const Ul = styled.ul`
  display: flex;
  list-style: none;
  @media (max-width: 760px) {
    flex-flow: row wrap;
    justify-content: center;
    max-width: 290px;
    margin-bottom: 20px;
  }
`;

const Li = styled.li`
  margin-left: 15px;
  font-size: 12px;
  line-height: 16px;
  color: #cedbe2;
  @media (max-width: 760px) {
    line-height: 26px;
  }
`;

const SPAN = styled.span`
  line-height: 22px;
  color: #4e5a61;
`;
