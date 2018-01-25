import React from 'react'
import styled from 'styled-components'
import { Link } from '../routes.js'

import FB from '../lib/firebase'
import { allDevices } from '../lib/auth-user'

export default class extends React.Component {
    state = { devices: [], filtered: [] }
    componentDidMount = async () => {
        // Firebase
        this.firebase = await FB()
        this.checkUser()
    }

    checkUser = () => {
        this.firebase.auth().onAuthStateChanged(async user => {
            if (user.email.substr('iota.org')) {
                // User is signed in.
                var devices = await allDevices(this.firebase)
                this.setState({ devices, filtered: devices })
                console.log(user)
            } else {
                // User is signed out.
                console.log('Logged Out')
            }
        })
    }

    change = e => {
        this.setState({ search: e.target.value })
        return this.search(e.target.value)
    }

    // Search Func
    search = term => {
        if (!term || term == '') {
            return this.setState({ filtered: this.state.devices })
        }
        var filtered = this.state.devices.filter(
            device =>
                JSON.stringify(device)
                    .toLowerCase()
                    .indexOf(term.toLowerCase()) !== -1
        )
        return this.setState({ filtered })
    }

    toggle = async (device, i) => {
        device.inactive = !device.inactive
        try {
            await this.firebase
                .firestore()
                .collection('devices')
                .doc(device.sensorId)
                .set({ inactive: device.inactive }, { merge: true })

            this.setState({
                devices: this.state.devices.map(
                    dev => (dev.sensorId == device.sensorId ? device : dev)
                )
            })
            this.search(this.state.search)
        } catch (e) {
            alert(e.message)
        }
    }
    render() {
        var { devices, search, filtered } = this.state
        return (
            <Main>
                <input
                    type={'search'}
                    value={search}
                    onChange={e => this.change(e)}
                />
                {filtered.map((device, i) => (
                    <Card
                        inactive={device.inactive}
                        key={`device-${device.sensorId}`}
                    >
                        <Row>
                            <Field>{device.sensorId}</Field>
                            <Field small>{device.type}</Field>
                        </Row>
                        <Row>
                            <Field>
                                {device.location &&
                                    `Location: ${device.location.city}, ${
                                        device.location.country
                                    }`}
                            </Field>
                        </Row>
                        <Link to={`/sensor/${device.sensorId}`}>
                            <a target="_blank"> View Device</a>
                        </Link>
                        <Button onClick={() => this.toggle(device, i)}>
                            {device.inactive ? 'Activate' : 'Deactivate'}
                        </Button>
                    </Card>
                ))}
            </Main>
        )
    }
}

const Button = styled.button``

const Main = styled.div`
    overflow-x: hidden;
`
const Card = styled.div`
    background: ${props =>
        props.inactive ? '#e2e2e2' : 'rgba(167, 234, 187, 1)'};
    padding: 10px;
    margin: 5px;
`
const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`
const Field = styled.p`
    padding: 0 5px;
    font-size: ${props => (props.small ? `80%` : `100%`)};
`
