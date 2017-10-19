import React from "react"
import styled, { css } from "styled-components"
import { Link } from "../../routes"
export default class extends React.Component {
  state = {}
  render() {
    return (
      <Section>
        <Header>
          <Heading>Sensor overview</Heading>
        </Header>
        <SlideWrapper>
          <Slide>
            {Array(6)
              .fill()
              .map((_, i) => (
                <Link route={"/sensor/test"} key={`sensor-${i}`}>
                  <Card data-component="SensorCard">
                    <CardHeader>
                      <CardIcon
                        src="/static/icons/icon-weather.svg"
                        alt="Weather sensor icon"
                      />
                      <SensorType>Weather sensor</SensorType>
                      <SensorId>ID-27281</SensorId>
                    </CardHeader>
                    <RowHalf>
                      <RowIcon
                        src="/static/icons/icon-small-packet.svg"
                        alt=""
                      />
                      <RowDesc>Data packets sent</RowDesc>
                      <Data>21829</Data>
                    </RowHalf>
                    <RowHalf>
                      <RowIcon
                        src="/static/icons/icon-small-location.svg"
                        alt=""
                      />
                      <RowDesc>Location</RowDesc>
                      <Data>Berlin</Data>
                    </RowHalf>
                    <CardFooter>
                      <FootRow>
                        <InfoKey>Owner:</InfoKey>
                        <InfoValue>Patrick Moore</InfoValue>
                      </FootRow>
                      <FootRow>
                        <InfoKey>Data entries:</InfoKey>
                        <InfoValue>Lorem ipsum</InfoValue>
                      </FootRow>
                      <FootRow>
                        <InfoKey>Data price:</InfoKey>
                        <InfoValue>$0.01</InfoValue>
                      </FootRow>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </Slide>
          <Slide right>
            <Card href="./sensor-data.html" data-component="SensorCard">
              <CardHeader>
                <CardIcon
                  src="/static/icons/icon-weather.svg"
                  alt="Weather sensor icon"
                />
                <SensorType>Weather sensor</SensorType>
                <SensorId>ID-27281</SensorId>
              </CardHeader>
              <RowHalf>
                <RowIcon src="/static/icons/icon-small-packet.svg" alt="" />
                <RowDesc>Data packets sent</RowDesc>
                <Data>21829</Data>
              </RowHalf>
              <RowHalf>
                <RowIcon src="/static/icons/icon-small-location.svg" alt="" />
                <RowDesc>Location</RowDesc>
                <Data>Berlin</Data>
              </RowHalf>
              <CardFooter>
                <FootRow>
                  <InfoKey>Owner:</InfoKey>
                  <InfoValue>Patrick Moore</InfoValue>
                </FootRow>
                <FootRow>
                  <InfoKey>Data entries:</InfoKey>
                  <InfoValue>Lorem ipsum</InfoValue>
                </FootRow>
                <FootRow>
                  <InfoKey>Data price:</InfoKey>
                  <InfoValue>$0.01</InfoValue>
                </FootRow>
              </CardFooter>
            </Card>
          </Slide>
        </SlideWrapper>
        <Nav>
          <Button type="button" active>
            <img src="/static/icons/icon-arrow-left.svg" alt="Icon arrow" />
          </Button>
          <Button type="button">
            <img
              style={{ transform: "rotate(180deg)" }}
              src="/static/icons/icon-arrow-left.svg"
              alt="Icon arrow"
            />
          </Button>
        </Nav>
        <Shape
          src="/static/shapes/shape-main-2.svg"
          class="shape-accent-2"
          alt="Shape svg"
        />
      </Section>
    )
  }
}
const Shape = styled.img`
  position: absolute;
  bottom: -40px;
  left: 70vw;
  z-index: -100;
  @media (max-width: 1120px) {
    bottom: 100px;
    left: 36vw;
  }
  @media (max-width: 760px) {
    display: none;
  }
`

const Section = styled.section`
  position: relative;
  padding-top: 90px;
  border-top: 1px solid #eaecee;
  margin-bottom: 120px;
  @media (max-width: 760px) {
    padding-top: 40px;
  }

  @media (max-width: 1120px) {
    padding-top: 50px;
  }
`
const Header = styled.header`
  margin-bottom: 50px;
  @media (max-width: 760px) {
    margin-bottom: 20px;
  }
`
const Heading = styled.h3`
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  text-align: center;
  text-transform: capitalize;
  color: #009fff;
  @media (max-width: 760px) {
    font-size: 24px;
    margin-bottom: 0;
  }
`
const SlideWrapper = styled.div`
  position: relative;
  min-height: 620px;
  @media (max-width: 1110px) {
    min-height: 920px;
  }
`
const Slide = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: ${props => (props.right ? "150%" : "50%")};
  transform: translateX(-50%);
  transition: all 0.15s ease-out;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  @media (max-width: 1420px) {
    justify-content: space-around;
  }
  @media (max-width: 760px) {
    flex-direction: column;
  }
`
const Card = styled.a`
  color: inherit;
  text-decoration: none;
  position: relative;
  width: 360px;
  padding-top: 20px;
  border: 1px solid #eaecee;
  border-radius: 6px;
  margin-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.19s ease-out;
  @media (max-width: 1120px) {
    margin-bottom: 20px;
  }
  @media (max-width: 400px) {
    width: 280px;
  }
  &:hover {
    box-shadow: 0 23px 50px 0 rgba(25, 54, 80, 0.1);
  }
`
const CardHeader = styled.header`
  position: relative;
  padding: 0 30px 8px 30px;
  border-bottom: 1px solid #eaecee;
`
const RowHalf = styled.div`
  padding: 20px 30px 14px;
  display: inline-block;
  &:first-child {
    width: 180px;
    border-right: 1px solid #eaecee;
  }

  &:first-of-type {
    @media (max-width: 400px) {
      border: none;
      width: 140px;
      padding-left: 20px;
      padding-right: 0;
    }
  }
`
const Data = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-top: 4px;
`
const RowDesc = styled.span`
  margin-left: 5px;
  font: 12px/16px "Nunito Sans", sans-serif;
  color: #808b92;
`
const RowIcon = styled.img`
  position: relative;
  top: 1px;
`
const SensorIcon = styled.img`margin-right: 10px;`
const CardFooter = styled.footer`
  padding: 20px 30px;
  background-color: rgba(206, 218, 226, 0.2);
  border-top: 1px solid #eaecee;
`
const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
`

const InfoKey = styled.span`
  color: #808b92;
  text-transform: capitalize;
  font: 12px/16px "Nunito Sans", sans-serif;
`

const InfoValue = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
`
const CardIcon = styled.img`margin-right: 10px;`
const SensorType = styled.span`
  font: 12px/16px "Nunito Sans", sans-serif;
  position: absolute;
  top: -8px;
  color: #808b92;
`
const SensorId = styled.span`
  font-size: 24px;
  top: -4px;
  line-height: 42px;
  position: relative;
  color: #009fff;
`

const Nav = styled.nav`
  margin: 30px 0;
  text-align: center;
  @media (max-width: 1120px) {
    margin-top: 20px;
  }
`
const Button = styled.button`
  position: relative;
  width: 60px;
  height: 46px;
  border-radius: 100px;
  margin: 0 5px;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  ${props =>
    props.active
      ? css`
          background-color: #009fff;
          box-shadow: 0 16px 25px 0 rgba(0, 159, 255, 0.27);
        `
      : css`
          border: 1px solid #eaecee;
          color: #808b92;
          background-color: #fff;
        `};
`
