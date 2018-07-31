import React from 'react';
import styled from 'styled-components';

export default props => (
  <S>
    <C>
      <H>
        <H3>Only with IOTA</H3>
        <H4>The enabling technology of the Data Marketplace</H4>
      </H>
      <R>
        <Col>
          <I src="/static/illustrations/fm.svg" alt="IOTA benefits ilustration" />
          <T>Feeless Micropayments</T>
          <P>
            IOTA is the first protocol that allows for feeless Micropayments, enabling new ways to
            monetize data.
          </P>
        </Col>
        <Col>
          <I src="/static/illustrations/sda.svg" alt="IOTA benefits ilustration" />
          <T>Secure Data Anchoring</T>
          <P>
            Once data is input into IOTA, it is distributed and made tamper-proof, establishing new
            trust in data.
          </P>
        </Col>
      </R>
    </C>
  </S>
);

const S = styled.section`
  position: relative;
  top: -40px;
  z-index: 100;
  padding-top: 90px;
  margin-bottom: 30px;
  background-color: #fff;
  @media (max-width: 760px) {
    margin-bottom: -30px;
  }
`;

const C = styled.div`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;

  &::after {
    content: '';
    position: absolute;
    bottom: -145px;
    left: 0;
    z-index: -10;
    width: 100vw;
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

const H = styled.header`
  margin-bottom: 90px;
`;

const H3 = styled.h3`
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  text-align: center;
  color: #009fff;
  @media (max-width: 760px) {
    font-size: 24px;
    margin-bottom: 0;
  }
`;

const H4 = styled.h4`
  font-size: 19px;
  font-weight: 400;
  line-height: 33px;
  margin-bottom: 60px;
  text-align: center;
  color: #4e5a61;
  @media (max-width: 760px) {
    font-size: 18px;
    line-height: 28px;
  }
`;

const R = styled.div`
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 945px;
  margin: 0 auto;
  display: flex;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background-color: #eaecee;
  }
  @media (max-width: 1120px) {
    max-width: 800px;
  }
  @media (max-width: 760px) {
    flex-direction: column;
    align-items: center;
    &::before {
      width: 0;
    }
  }
`;

const Col = styled.div`
  width: 100%;
  max-width: 360px;
  margin-bottom: 10px;
  text-align: center;
  @media (max-width: 760px) {
    &:not(:last-of-type) {
      margin-bottom: 40px;
    }
  }
`;

const I = styled.img`
  height: auto;
  width: auto;
  min-height: 210px;
  min-width: 210px;
`;

const T = styled.p`
  font-size: 24px;
  line-height: 42px;
  margin: 30px 0 10px;
  @media (max-width: 760px) {
    font-size: 22px;
    margin: 20px 0 0;
  }
`;

const P = styled.p`
  line-height: 32px;
  color: #4e5a61;
`;
