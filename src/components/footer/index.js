import React from 'react';
import styled from 'styled-components';

export default props => (
  <F id="footer">
    <ContentOuterWrapper>
      <ContentInnerWrapper>
        <C>
          <L>
            <A order={1} href="https://www.iota.org/">
              www.iota.org
            </A>
            <A order={2} href="https://blog.iota.org/">
              blog.iota.org
            </A>
            <AIMG order={3} href="https://www.iota.org/">
              <IMG
                src="/static/logotypes/logo-footer.png"
                srcSet="/static/logotypes/logo-footer@2x.png 2x"
                alt="IOTA logotype"
              />
            </AIMG>
            <A order={4} href="http://ecosystem.iota.org/">
              ecosystem.iota.org
            </A>
            <A order={5} href="http://docs.iota.org/">
              docs.iota.org
            </A>
          </L>
          <N>
            <Copy>© 2017 IOTA Foundation. All rights reserved.</Copy>
          </N>
        </C>
        <W>
          <P>
            Disclaimer: This experimental IOTA Data Marketplace runs on the IOTA testnet.
            Participants can choose to make their data available for free to other marketplace
            participants or to offer it for fictional "sales" in IOTA testnet tokens. No real world
            payments or other real world financial consequences will result from this experiment.
            All data being contributed to this proof of concept is either non-sensitive data of
            which the participants are the authorized owners and/or is publicly available data which
            the participants may freely choose to share. Participation in the IOTA Data Marketplace
            takes place on a voluntary, non-contractual basis. Participants may choose to
            discontinue their participation at any time.
          </P>
        </W>
      </ContentInnerWrapper>
    </ContentOuterWrapper>
  </F>
);

const ContentOuterWrapper = styled.div`
  transform: skewY(2deg);
  position: relative;
  bottom: -35px;
  background-image: linear-gradient(-329deg, #1857eb 31%, #0d3497 65%);
`;

const ContentInnerWrapper = styled.div`
  transform: skewY(-2deg);
  display: flex;
  flex-direction: column;
  padding: 40px 0;
`;

const IMG = styled.img`
  padding: 0 75px;

  @media (max-width: 768px) {
    padding: 0;
  }
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
  color: #ffffff;
  order: ${props => (props.order ? props.order : 'unset')};

  &:visited {
    color: #ffffff;
  }
`;

const AIMG = A.extend`
  margin: 0;
  text-align: center;
  @media (max-width: 650px) {
    order: 0;
    align-self: center;
  }
`;

const F = styled.footer`
  padding: 10px 0;
  overflow: hidden;
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

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const N = styled.nav`
  text-align: center;
`;

const Copy = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: #cedbe2;
`;
