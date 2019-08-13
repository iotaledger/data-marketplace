import React from 'react';
import styled from 'styled-components';
import Heading from './heading';

export default class Content extends React.Component {
  componentDidUpdate() {
    if (this.props.anchor) {
      const target = document.querySelector(`#${this.props.anchor}`);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render() {
    const {
      content: { id, title, text, img = null },
    } = this.props;
    return (
      <SECTION id={id || null}>
        {title ? <Heading title={title} img={img} /> : null}
        <DIV>
          {
            typeof text === 'object' ? (
              <P>{text}</P>
            ) : (
              <P dangerouslySetInnerHTML={{ __html: text }} />
            )
          }
        </DIV>
      </SECTION>
    );
  }
}

const SECTION = styled.section`
  z-index: 10;
  padding: 20px;
  max-width: 724px;
  width: 100%;
  display: flex;
  align-self: center;
  align-items: flex-start;
  flex-direction: column;
`;

const DIV = styled.div`
  display: flex;
  justify-content: center;
`;

const P = styled.p`
  @media (max-width: 1120px) {
    margin: 0 auto;
  }
  font-size: 16px;
  line-height: 27px;
  color: #4e5a61;
  max-width: 724px;
`;
