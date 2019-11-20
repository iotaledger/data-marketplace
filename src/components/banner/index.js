import React from 'react';
import styled from 'styled-components';

export default () => (
  <S>
    <a 
        href="https://industry.iota.org/"
        target="_blank" 
        rel="noopener noreferrer"
    >
        <C>
                <New>
                    NEW
                </New>
                <P>
                    Visit our new Industry Marketplace<br />for latest integrations and<br />collaborations for Industry 4.0
                </P>
                <I src="/static/icons/arrow-right.svg" alt="" />
        </C>
    </a>
  </S>
);

const S = styled.section`
  position: relative;
  top: 35px;
  left: 35px;
  height: 0;
  z-index: 1000;
  width: 420px;

  @media (max-width: 768px) {
    height: 165px;
  }
`;

const C = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    border-radius: 6px;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 23px 50px 0 rgba(25, 54, 80, 0.2);
    transition: box-shadow 0.19s ease-out;
    &:hover {
        box-shadow: 0 23px 50px 0 rgba(25, 54, 80, 0.3);
    }
`;

const I = styled.img`
  position: absolute;
  right: 15px;
  top: calc(50% - 7px); 
  height: 15px;
  width: 10px;
`;

const P = styled.p`
  line-height: 27px;
  color: #000;
  font-size: 17px;
  letter-spacing: .04em;
  font-weight: 400;
  text-align: left;
  padding: 18px;
`;

const New = styled(P)`
  width: 18%;
  max-width: 100px;
  background-color: #173a9a;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  font-size: 15px;
  font-weight: 900;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;
