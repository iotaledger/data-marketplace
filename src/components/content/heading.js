import React from 'react';
import styled from 'styled-components';

export default class Heading extends React.Component {
  componentDidUpdate() {
    if (this.props.anchor) {
      const target = document.querySelector(`#${this.props.anchor}`);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render() {
    const { id, title, img } = this.props;
    return (
      <HEADER id={id || null}>
        {img ? (
          <HeaderWrapper>
            <IMG src={img} alt={title} />
            <H3IMG>{title}</H3IMG>
          </HeaderWrapper>
        ) : (
          <H3>{title}</H3>
        )}
      </HEADER>
    );
  }
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HEADER = styled.header`
  margin-bottom: 20px;
  width: 100%;
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: normal;
  line-height: 32px;
  margin-bottom: 12px;
  text-align: center;
  color: #009fff;
  @media (max-width: 760px) {
    font-size: 24px;
    margin-bottom: 0;
  }
`;

const H3IMG = styled(H3)`
  text-align: left;
  color: #292929;
  margin-bottom: 0;
`;

const IMG = styled.img`
  width: 80px;
  margin-right: 20px;
`;
