import React from 'react'
import styled from 'styled-components'
import Recaptcha from 'react-recaptcha'

export default class extends React.Component {
  state = { name: '', email: '', body: '', captcha: null }

  verify = data => {
    this.setState({ captcha: data })
  }

  render() {
    return (
      <S>
        <C>
          <H>Get Involved</H>
        </C>
        <C>
          <input type={'text'} />
          <input type={'email'} />
          <textarea />
          <Recaptcha
            sitekey="6LeIFTsUAAAAAHRqa-Y9JtoN8Bopd3gQBDM2ItCm"
            verifyCallback={this.verify}
          />,
        </C>
      </S>
    )
  }
}

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
