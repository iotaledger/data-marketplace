import React from 'react';
import styled from 'styled-components';
import Heading from './heading';

export default class List extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.anchor) {
      const target = document.querySelector(`#${nextProps.anchor}`);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render() {
    const { id, items, title } = this.props;
    return (
      <C id={id || null}>
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
  }
}

const C = styled.div`
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
  }
  font-size: 17px;
  line-height: 32px;
  color: #4e5a61;
`;
