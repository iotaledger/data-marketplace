import React from 'react';
import styled from 'styled-components';
import Heading from './heading';

export default class List extends React.Component {
  render() {
    const { id, items, title } = this.props;
    return (
      <DIV id={id || null}>
        {title ? <Heading title={title} /> : null}
        <Ul>
          {items.map(item => (
            <Li key={item}>
              <SPAN dangerouslySetInnerHTML={{ __html: item }} />
            </Li>
          ))}
        </Ul>
      </DIV>
    );
  }
}

const DIV = styled.div`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Ul = styled.ul`
  width: 100%;
  max-width: 724px;
  list-style: none;
  padding: 0 20px;
  margin: 0;
`;

const Li = styled.li`
  color: #cedbe2;
  display: flex;
  line-height: 16px;

  &::before {
    content: '•';
    padding-right: 14px;
    padding-top: 4px;
    color: #009fff;
  }
`;

const SPAN = styled.span`
  font-size: 16px;
  line-height: 27px;
  color: #4e5a61;
`;
