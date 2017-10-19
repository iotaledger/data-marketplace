import React from "react"
import styled, { keyframes } from "styled-components"

const Container = styled.section`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin: 40px 0 20px;
`
const Header = styled.h3`
  @media (max-width: 760px) {
    font-size: 24px;
    margin-bottom: 0;
  }
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  text-align: center;
  color: #009fff;
`
const Tagline = styled.h4`
  @media (max-width: 760px) {
    font-size: 18px;
    line-height: 28px;
  }
  font-size: 19px;
  font-weight: 400;
  line-height: 33px;
  margin-bottom: 60px;
  text-align: center;
  color: #4e5a61;
`
const InfoRow = styled.div`
  @media (max-width: 760px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  display: flex;
  justify-content: space-between;
`
const InfoCol = styled.div`
  @media (max-width: 760px) {
    margin-bottom: 40px;
  }
  width: 100%;
  max-width: 350px;
  text-align: center;
`
const Image = styled.img`
  @media (max-width: 760px) {
    margin-bottom: 18px;
  }
  margin-bottom: 35px;
`

const InfoHeading = styled.p`
  @media (max-width: 760px) {
    font-size: 22px;
    margin-bottom: 0;
  }
  font-size: 24px;
  line-height: 42px;
  margin-bottom: 10px;
`
const Text = styled.p`
  @media (max-width: 1120px) {
    font-size: 16px;
    line-height: 27px;
    max-width: 260px;
    margin: 0 auto;
  }
  font-size: 17px;
  line-height: 32px;
  color: #4e5a61;
`

export default class extends React.Component {
  state = {}

  render() {
    return (
      <Container>
        <div>
          <Header>How it works?</Header>
          <Tagline>Lorem ipsum dolor sit amet enim etiam.</Tagline>
        </div>
        <InfoRow>
          <InfoCol>
            <Image
              src="/static/ilustrations/choose.svg"
              alt="IOTA process lustration"
            />
            <InfoHeading>Choose</InfoHeading>
            <Text>
              Pick a sensor from which you want to access the data from. Take a
              look at the map<br className="tablet-hidden" /> below and pick any
              type of sensor.
            </Text>
          </InfoCol>
          <InfoCol>
            <Image
              src="/static/ilustrations/pay.svg"
              alt="IOTA process lustration"
            />
            <InfoHeading>Pay</InfoHeading>
            <Text>
              For each sensor you can purchase direct access to the data stream.
              Thanks<br className="tablet-hidden" /> to the power of
              micropayments.
            </Text>
          </InfoCol>
          <InfoCol>
            <Image
              src="/static/ilustrations/access.svg"
              alt="IOTA process lustration"
            />
            <InfoHeading>Access</InfoHeading>
            <Text>
              Continuously access the data from the sensor and use that data to
              fuel your reports, applications and data analytics.
            </Text>
          </InfoCol>
        </InfoRow>
      </Container>
    )
  }
}
