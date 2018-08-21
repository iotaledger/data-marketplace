import React from 'react';
import styled from 'styled-components';
import Heading from './heading';

export default class Content extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.anchor) {
      const target = document.querySelector(`#${nextProps.anchor}`);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render() {
    const {
      content: { id, title, text },
    } = this.props;
    return (
      <S id={id || null}>
        {title ? <Heading title={title} /> : null}
        <C>
          <P dangerouslySetInnerHTML={{ __html: text }} />
        </C>
      </S>
    );
  }
}

const S = styled.section`
  z-index: 10;
  padding-top: 20px;
  margin-bottom: 20px;
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
