import React from 'react';
import styled from 'styled-components';

export default props => (
  <F>
    <Container>
      <C>
        <L>
          <A href="https://www.iota.org/">www.iota.org</A>
          <A href="https://blog.iota.org/">blog.iota.org</A>
          <a href="https://www.iota.org/">
            <IMG
              src="/static/logotypes/logo-footer.png"
              srcSet="/static/logotypes/logo-footer@2x.png 2x"
              alt="IOTA logotype"
            />
          </a>
          <A href="http://ecosystem.iota.org/">ecosystem.iota.org</A>
          <A href="http://docs.iota.org/">docs.iota.org</A>
        </L>
        <N>
          <Copy>© 2017 IOTA Foundation. All rights reserved.</Copy>
        </N>
      </C>
      <W>
        <P>
          Disclaimer: This experimental IOTA Data Marketplace runs on the IOTA testnet. Participants
          can choose to make their data available for free to other marketplace participants or to
          offer it for fictional "sales" in IOTA testnet tokens. No real world payments or other
          real world financial consequences will result from this experiment. All data being
          contributed to this proof of concept is either non-sensitive data of which the
          participants are the authorized owners and/or is publicly available data which the
          participants may freely choose to share. Participation in the IOTA Data Marketplace takes
          place on a voluntary, non-contractual basis. Participants may choose to discontinue their
          participation at any time.
        </P>
      </W>
    </Container>
  </F>
);

const IMG = styled.img`
  padding: 0px 75px;
`;

const P = styled.p`
  font-size: 80%;
  padding: 0px 20px;
  margin: 30px auto 0;
  color: rgba(255, 255, 255, 0.6);
`;

const A = styled.a`
  font-size: 14px;
  margin: 14px auto 0;
  color: rgb(255, 255, 255);
  text-decoration: none;
`;

const F = styled.footer`
  background-image: linear-gradient(-329deg, #1857eb 31%, #0d3497 65%);
  padding: 70px 0 20px;
  @media (max-width: 760px) {
    padding: 90px 0 3px;
  }
  // transform: skewY(3deg);
`;

const Container = styled.div`
  // transform: skewY(-3deg);
`;

const C = styled.div`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
`;

const W = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const L = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
`;

const N = styled.nav`
  text-align: center;
`;

const Copy = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: #cedbe2;
`;
