import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from '../../routes'
export default class extends React.Component {
  state = { devices: [], slideIndex: 0 }

  componentWillReceiveProps = props => {
    this.setState({ devices: this.sort(props.devices) })
  }

  componentDidMount = async () => {
    // this.setState({ devices: this.sort(JSON.parse(data)) })
    this.setState({ devices: this.sort(this.props.devices) })
  }

  sort = devices => {
    var org = {}
    devices.map(device => {
      if (!org[device.company]) org[device.company] = []
      org[device.company].push(device)
    })
    return org
  }

  shift = direction => {
    if (direction === 'right') {
      this.setState({ slideIndex: this.state.slideIndex + 1 })
    } else {
      this.setState({ slideIndex: this.state.slideIndex - 1 })
    }
  }

  render() {
    var { devices, slideIndex } = this.state
    console.log(slideIndex)
    console.log(slideIndex < Object.keys(devices).length)
    return (
      <Section>
        <Header>
          <Heading>Sensor overview</Heading>
        </Header>
        <SlideWrapper index={slideIndex}>
          {Object.keys(devices).map((company, i) => (
            <Slide index={i} slide={slideIndex} key={`company-${i}`}>
              {devices[company].map((item, index) => (
                <Link
                  route={`/sensor/${item.sensorId}`}
                  key={`sensor-${index}`}
                >
                  <Card data-component="SensorCard">
                    <CardHeader>
                      <CardIcon
                        src="/static/icons/icon-weather.svg"
                        alt="Weather sensor icon"
                      />
                      <SensorType>Weather sensor</SensorType>
                      <SensorId>{item.sensorId || '--'}</SensorId>
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
                      <Data>{item.location.city || '--'}</Data>
                    </RowHalf>
                    <CardFooter>
                      <FootRow>
                        <InfoKey>Owner:</InfoKey>
                        <InfoValue>{item.company || '--'}</InfoValue>
                      </FootRow>
                      <FootRow>
                        <InfoKey>Data entries:</InfoKey>
                        <InfoValue>Lorem ipsum</InfoValue>
                      </FootRow>
                      <FootRow>
                        <InfoKey>Data price:</InfoKey>
                        <InfoValue>
                          {item.value ? item.value + 'i' : '--'}
                        </InfoValue>
                      </FootRow>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </Slide>
          ))}
        </SlideWrapper>
        <Nav>
          <Button
            type="button"
            onClick={() => slideIndex > 0 && this.shift('left')}
            active={slideIndex > 0}
          >
            <img src="/static/icons/icon-arrow-left.svg" alt="Icon arrow" />
          </Button>
          <Button
            type="button"
            onClick={() =>
              slideIndex < Object.keys(devices).length - 1 &&
              this.shift('right')}
            active={slideIndex < Object.keys(devices).length - 1}
          >
            <img
              style={{ transform: 'rotate(180deg)' }}
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
  overflow-y: hidden;
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
  height: auto;
  transition: all 0.4s ease;
  /* min-height: 620px;
  @media (max-width: 1110px) {
    min-height: 920px;
  } */
`

const slide = (index, slide) => {
  if (index === slide) {
    return '50%'
  }
  if (index > slide) {
    return `150%`
  } else {
    return `-150%`
  }
}
const Slide = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  position: ${props => (props.index === props.slide ? 'relative' : 'absolute')};
  top: 0;
  left: ${props => slide(props.index, props.slide)};
  transform: translateX(-50%);
  transition: all 0.4s ease-out;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
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
  font: 12px/16px 'Nunito Sans', sans-serif;
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
  font: 12px/16px 'Nunito Sans', sans-serif;
`

const InfoValue = styled.span`
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
`
const CardIcon = styled.img`margin-right: 10px;`
const SensorType = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
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

// const data = `[{"address":"RKWYXENMHNBVAZJEBXNILEFGUYQLUYRGGGSJBMIKCCLWOQVEERIXVOIFFMOIEUTYEIOSELCACNQFWTGCEJJNT9QMGC","company":"DNVGL","dataTypes":[{"id":"temp","name":"temp","unit":"C"}],"lat":"63.36243","location":{"city":"Trondheim","country":"Norway"},"lon":"10.372489","sensorId":"DNVGLTEST","type":"RaspberryPI","value":350},{"address":"MUCVUD9HANLWGQWXC9XEU9CLMDTQNLORYQSCKERZONXCFNFJ9JTC9BSFZJMRFTBFJZQWKRTYTFFVACQDJGUMONEKCX","company":"DNV GL","dataTypes":[{"id":"temp","name":"temp","unit":"C"}],"lat":"63.36243","location":{"city":"Trondheim","country":"Norway"},"lon":"10.372489","sensorId":"DNVGLTRD","type":"temp sensor","value":350},{"address":"R9ZSOBUZVNUMSBNIDRPLLQLGABQSR9TRIAJQ9BHPBMULEUUOQTBEJLRTINHMOIFFWTCFJYYTBEY9LCO99","company":"SAP","dataTypes":[{"id":"temp","name":"Temperature","unit":"C"},{"id":"pres","name":"Pressure","unit":"pHa"}],"lat":"52.525870","location":{"city":"Berlin","country":"Germany"},"lon":"13.403037","sensorId":"SAP_sensor","type":"weather","value":340},{"company":"Bosch","dataTypes":[{"id":"temp","name":"Temperature","unit":"°C"},{"id":"poll","name":"Pollution","unit":"G"},{"id":"pres","name":"Pressure","unit":"W"}],"location":{"city":"Berlin","country":"Germany"},"sensorId":"XYZ","type":"Weather Station"},{"address":"R9ZSOBUZVNUMSBNIDRPLLQLGABQSR9TRIAJQ9BHPBMULEUUOQTBEJLRTINHMOIFFWTCFJYYTBEY9LCO99","company":"BMW","dataTypes":[{"id":"temp","name":"Temperature","unit":"c"}],"lat":"48.176927","location":{"city":"Garching","country":"München"},"lon":"11.559996","sensorId":"bmw-1","type":"Weather Station inside","value":305},{"address":"NMBBMJACNALUMSLXHPFRGLYRZW9KHUUFBOHREUONOKXVTZOMTYZ9BRWQWLCRDQEUJUNDGATMUEGTJXNEKGRGPEJSHX","company":"BMW","dataTypes":[{"id":"temp","name":"Temperature","unit":"c"}],"lat":"12","location":{"city":"Berlin","country":"Germany"},"lon":"52","sensorId":"bmw-2","type":"Temp Sensor","value":350},{"address":"CZFKMTQFQVYRXBJ9ZAZTRMKOSGXNROCERURIQNNWLEIHGHBWYPCEIC9KTFVMEGZS9HNOIM9IQHCJQQ9IAPZXUGVIJZ","company":"BMW","dataTypes":[{"id":"odometer","name":"Odometer","unit":"km"}],"lat":"12","location":{"city":"Muenchen","country":"Germany"},"lon":"52","sensorId":"bmw-3","type":"Odometer","value":350},{"address":"R9ZSOBUZVNUMSBNIDRPLLQLGABQSR9TRIAJQ9BHPBMULEUUOQTBEJLRTINHMOIFFWTCFJYYTBEY9LCO99","company":"SAP","dataTypes":[{"id":"temp","name":"Temperature","unit":"C"},{"id":"pres","name":"Pressure","unit":"hPa"}],"lat":"52.434983","location":{"city":"Potsdam","country":"Germany"},"lon":"13.055286","sensorId":"mysensor","type":"BMT280-bosch","value":305},{"address":"MUCVUD9HANLWGQWXC9XEU9CLMDTQNLORYQSCKERZONXCFNFJ9JTC9BSFZJMRFTBFJZQWKRTYTFFVACQDJGUMONEKCX","company":"NOGtec","dataTypes":[{"id":"temp","name":"temperature","unit":"c"}],"location":{"city":"Berlin","country":"Germany"},"sensorId":"nog76-1","type":"Wetterstation","value":350},{"address":"R9ZSOBUZVNUMSBNIDRPLLQLGABQSR9TRIAJQ9BHPBMULEUUOQTBEJLRTINHMOIFFWTCFJYYTBEY9LCO99","company":"Bosch","dataTypes":[{"id":"pres","name":"Pressure","normalise":0.321,"unit":"hpa"},{"id":"temp","name":"Temperature","normalise":"1","unit":"c"},{"id":"poll","name":"Pollution","unit":"pm2.5"}],"lat":"46.222495","location":{"city":"Berlin","country":"Germany"},"lon":"6.138718","owner":"Jeff Bridges","sensorId":"test","totalPackets":33202,"type":"Potato Scales","value":350}]`
