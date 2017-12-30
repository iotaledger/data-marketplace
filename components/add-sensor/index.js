import styled, { css } from 'styled-components'
import React from 'react'
import Card from '../card'

const Heading = state => <Header>New Device</Header>

export default class extends React.Component {
  state = {
    loading: false,
    active: false,
    submit: false,
    comapny: '',
    deviceID: '',
    deviceType: '',
    deviceLocation: '',
    deviceLat: '',
    deviceLon: '',
    dataTypes: [{ id: '', name: '', unit: '' }]
  }

  addRow = () => {
    var dataTypes = this.state.dataTypes
    dataTypes.push({ id: '', name: '', unit: '' })
    this.setState({ dataTypes })
  }
  remove = i => {
    var data = this.state.dataTypes
    if (data.length == 1) return alert('You must have at least one data field.')
    data.splice(i, 1)
    this.setState({ dataTypes: data })
  }

  change = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  changeRow = (e, i) => {
    var data = this.state.dataTypes
    data[i][e.target.name] = e.target.value
    this.setState({ dataTypes: data })
  }

  submit = async () => {
    if (!this.state.deviceID)
      return alert('Please enter a device ID. eg. company-32')
    if (!this.state.deviceType)
      return alert('Specify type of device. eg. Weather station or Wind Vein')
    if (!this.state.city || !this.state.country)
      return alert('Enter city or country')
    if (!this.state.deviceLat || !this.state.deviceLon)
      return alert('Please enter a device coordinates')
    if (!this.state.dataTypes || this.state.dataTypes.length < 1)
      return alert('You must have a valid data field')
    var device = {
      type: this.state.deviceType,
      location: {
        city: this.state.city,
        country: this.state.country
      },
      sensorId: this.state.deviceID,
      type: this.state.deviceType,
      dataTypes: this.state.dataTypes,
      lat: this.state.deviceLat,
      lon: this.state.deviceLon,
      value: (Math.random() * 120 + 260).toFixed(0),
      address: seedGen(81)
    }

    // Generate Key for the device
    let secretKey = seedGen(15)
    //
    this.setState({ loading: true }, () => this.props.create(device, secretKey))
  }

  render() {
    var { active } = this.state
    return (
      <Card header={Heading(this.state)}>
        {active && (
          <Form>
            <Column>
              <label>Device ID:</label>
              <Input
                placeholder={'eg. bosch-x910'}
                type={'text'}
                name={'deviceID'}
                value={this.state.deviceID}
                onChange={e => this.change(e)}
              />
            </Column>
            <Column>
              <label>Company:</label>
              <Input
                placeholder={'eg. Bosch'}
                type={'text'}
                name={'company'}
                value={this.state.company}
                onChange={e => this.change(e)}
              />
            </Column>
            <Column>
              <label>Device Type:</label>
              <Input
                placeholder={'eg. Weather Station'}
                type={'text'}
                name={'deviceType'}
                value={this.state.deviceType}
                onChange={e => this.change(e)}
              />
            </Column>
            <Column>
              <label>Location:</label>
              <Row>
                <Input
                  placeholder={'eg. Berlin'}
                  type={'text'}
                  name={'city'}
                  value={this.state.city}
                  onChange={e => this.change(e)}
                />
                <Input
                  placeholder={'eg. Germany'}
                  type={'text'}
                  name={'country'}
                  value={this.state.country}
                  onChange={e => this.change(e)}
                />
              </Row>
            </Column>
            <Row>
              <Column>
                <label>Latitude:</label>
                <Input
                  placeholder={'Lat: -12.312'}
                  type={'number'}
                  name={'deviceLat'}
                  value={this.state.deviceLat}
                  onChange={e => this.change(e)}
                />
              </Column>
              <Column>
                <label>Longitude:</label>
                <Input
                  placeholder={'Lon: 52.221'}
                  type={'number'}
                  name={'deviceLon'}
                  value={this.state.deviceLon}
                  onChange={e => this.change(e)}
                />
              </Column>
            </Row>
            <Row style={{ justifyContent: 'space-between' }}>
              <Header>Data Fields:</Header>
              <Add onClick={() => this.addRow()}>
                <IconButton src="/static/icons/icon-add.svg" />
              </Add>
            </Row>
            {this.state.dataTypes.map((fields, i) => (
              <Row key={i}>
                <Small>
                  <label>Field ID:</label>
                  <Input
                    placeholder={'eg. temp'}
                    type={'text'}
                    name={'id'}
                    value={this.state.dataTypes[i].id}
                    onChange={e => this.changeRow(e, i)}
                  />
                </Small>
                <Small>
                  <label>Field Name:</label>
                  <Input
                    placeholder={'eg. Temperature'}
                    type={'text'}
                    name={'name'}
                    value={this.state.dataTypes[i].name}
                    onChange={e => this.changeRow(e, i)}
                  />
                </Small>

                <Small>
                  <label>Field Unit:</label>
                  <Input
                    placeholder={'eg. c'}
                    type={'text'}
                    name={'unit'}
                    value={this.state.dataTypes[i].unit}
                    onChange={e => this.changeRow(e, i)}
                  />
                </Small>
                <Add style={{ flex: 1 }} onClick={() => this.remove(i)}>
                  <IconButton src="/static/icons/icon-delete.svg" />
                </Add>
              </Row>
            ))}
          </Form>
        )}
        {active ? (
          <FootRow>
            <FooterButton grey onClick={() => this.setState({ active: false })}>
              Cancel
            </FooterButton>
            <FooterButton onClick={() => this.submit()}>Submit</FooterButton>
          </FootRow>
        ) : (
          <FootRow>
            <FooterButton onClick={() => this.setState({ active: true })}>
              Add device
            </FooterButton>
          </FootRow>
        )}
      </Card>
    )
  }
}

const Form = styled.form`
  transition: all 0.5s ease;
  padding: 20px 30px;
`

const Header = styled.span`
  font-size: 24px;
  top: 6px;
  line-height: 42px;
  position: relative;
  color: #009fff;
`
const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  background-color: rgba(206, 218, 226, 0.2);
  border-top: 1px solid #eaecee;
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

const Label = styled.p``
const Para = styled.p`
  font-weight: 300;
`
const Bold = Para.extend`
  font-size: 110%;
  font-weight: 600;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Small = Column.extend`
  width: 30%;
  @media (max-width: 760px) {
    width: 100%;
  }
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`

const IconButton = styled.img`
  height: 20px;
  width: 20px;
`

const FooterButton = styled.button`
  color: ${props =>
    props.grey ? `rgba(41, 41, 41, 0.4)` : `rgba(41, 41, 41, 0.9)`};
  padding: 10px 15px 10px 15px;
  margin-right: -15px;
  font-size: 105%;
  background: transparent;
  &:first-of-type {
    margin-left: -15px;
    margin-right: 0;
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 3px 10px 3px 0;
  margin: 0px 5px 10px 0;
  border-bottom: 2px solid #eee;
  background: transparent;
  &::placeholder {
  }
`
const Add = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  paddin: 10px 0 0;
`

const seedGen = length => {
  var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
  var i
  var result = ''
  if (window.crypto && window.crypto.getRandomValues) {
    var values = new Uint32Array(length)
    window.crypto.getRandomValues(values)
    for (i = 0; i < length; i++) {
      result += charset[values[i] % charset.length]
    }
    return result
  } else
    throw new Error(
      "Your browser is outdated and can't generate secure random numbers"
    )
}
