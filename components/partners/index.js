import React from 'react'
import styled from 'styled-components'

export default props => (
  <S>
    <C>
      <H>Marketplace Participants</H>
      <Ul>
        <Li>
          <I
            src="/static/logotypes/accenture.png"
            srcSet="/static/logotypes/accenture.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/agder.png"
            srcSet="/static/logotypes/agder.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/apgsga.png"
            srcSet="/static/logotypes/apgsga.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/blocklab.png"
            srcSet="/static/logotypes/blocklab.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/bosch.png"
            srcSet="/static/logotypes/bosch.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/dnvgl.png"
            srcSet="/static/logotypes/dnvgl.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/elering.png"
            srcSet="/static/logotypes/elering.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/engie.png"
            srcSet="/static/logotypes/engie.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/ewe.png"
            srcSet="/static/logotypes/ewe.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/farmforce.png"
            srcSet="/static/logotypes/farmforce.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/fujitsu.png"
            srcSet="/static/logotypes/fujitsu.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/ice.png"
            srcSet="/static/logotypes/ice.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/ismb.png"
            srcSet="/static/logotypes/ismb.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/movimento.png"
            srcSet="/static/logotypes/movimento.png 2x"
            alt="Logo"
          />
        </Li>{' '}
        <Li>
          <I
            src="/static/logotypes/ntnu.png"
            srcSet="/static/logotypes/ntnu.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/orange.png"
            srcSet="/static/logotypes/orange.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/oslo.png"
            srcSet="/static/logotypes/oslo.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/poyry.png"
            srcSet="/static/logotypes/poyry.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/samsung.png"
            srcSet="/static/logotypes/samsung.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/schneider.png"
            srcSet="/static/logotypes/schneider.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/tine.png"
            srcSet="/static/logotypes/tine.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/trianel.png"
            srcSet="/static/logotypes/trianel.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/trondheim.png"
            srcSet="/static/logotypes/trondheim.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/tum.png"
            srcSet="/static/logotypes/tum.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/uio.png"
            srcSet="/static/logotypes/uio.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <I
            src="/static/logotypes/undc.png"
            srcSet="/static/logotypes/undc.png 2x"
            alt="Logo"
          />
        </Li>
      </Ul>
    </C>
  </S>
)

const S = styled.section`
  background-image: linear-gradient(-189deg, #eaf0f4 1%, #f3f8fa 95%);
  padding: 90px 0 70px;
  transform: skewY(-2deg);
  @media (max-width: 760px) {
    padding-bottom: 45px;
  }
`
const C = styled.div`
  transform: skewY(2deg);
  width: 100%;
  max-width: 1440px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
`
const H = styled.p`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.84px;
  text-align: center;
  text-transform: uppercase;
  color: #cedbe2;
  @media (max-width: 760px) {
    margin-bottom: 40px;
  }
`

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px auto;
  width: 80%;
  list-style: none;
  @media (max-width: 1120px) {
    justify-content: space-around;
  }
  @media (max-width: 760px) {
    flex-flow: row wrap;
    max-width: 370px;
    margin: 0 auto;
  }
`
const Li = styled.li`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  @media (max-width: 1120px) {
    &:not(:last-of-type) {
      margin-right: 0;
    }
  }
  @media (max-width: 760px) {
    margin-bottom: 40px;
  }
`
const I = styled.img`
  max-height: 120px;
  max-width: 200px;
  padding: 10px 15px;
  @media (max-width: 760px) {
    max-width: 150px;
  }
`
