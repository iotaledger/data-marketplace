import React from 'react'
import styled from 'styled-components'

export default props => (
  <S>
    <C>
      <H>Our Corporate Partners</H>
      <Ul>
        <Li>
          <img
            src="/static/logotypes/placeholder.png"
            srcSet="/static/logotypes/placeholder.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <img
            src="/static/logotypes/placeholder.png"
            srcSet="/static/logotypes/placeholder.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <img
            src="/static/logotypes/placeholder.png"
            srcSet="/static/logotypes/placeholder.png 2x"
            alt="Logo"
          />
        </Li>
        <Li>
          <img
            src="/static/logotypes/placeholder.png"
            srcSet="/static/logotypes/placeholder.png 2x"
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
  max-width: 1170px;
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
  margin: 40px 0;
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
