import React from 'react'
import styled from 'styled-components'
import { reducer, getBalance } from '../../lib/utils'
import Clipboard from 'react-clipboard.js'
import { Link } from '../../routes'
const Sidebar = styled.aside`
    background: rgba(240, 240, 240, 1);
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    width: 25vw;
    min-width: 330px;
    padding: 40px 30px 0 0;
    @media (max-width: 1235px) {
        width: 10vw;
        min-width: 290px;
    }
    @media (max-width: 760px) {
        width: 100%;
        padding: 30px 15px;
    }
`

const Details = styled.div`
    width: 230px;
    position: relative;
    padding-bottom: 30px;
    margin-bottom: 30px;
    @media (max-width: 760px) {
        width: 100%;
    }
    &::before {
        content: '';
        position: absolute;
        right: -30px;
        bottom: 0;
        height: 1px;
        width: 100vw;
        background-color: rgba(115, 143, 212, 0.15);
    }
`
const Label = styled.label`
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.41px;
    position: relative;
    display: block;
    margin: 0 0 30px;
    cursor: pointer;
    text-transform: uppercase;
    color: #595959ff;
`
const DetailRow = styled.div`
    @media (max-width: 760px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`
const DetailKey = styled.p`
    font-size: 12px;
    line-height: 16px;
    color: #738fd4;
`
const DetailValue = styled.p`
    font-size: 16px;
    line-height: 32px;
    color: #595959ff;
`

export default class extends React.Component {
    state = { alert: false, alertMessage: '' }
    componentWillReceiveProps = props => {
        this.setState(props)
    }

    alert = text => {
        this.setState({ alert: text, alertMessage: text }, () =>
            setTimeout(
                () => this.setState({ alert: false, alertMessage: text }),
                1500
            )
        )
    }

    render() {
        var { deviceInfo } = this.props
        return (
            <Sidebar>
                <Details>
                    <Label>Your Statistics:</Label>
                    <div>
                        <DetailRow>
                            <DetailKey>Number of Devices:</DetailKey>
                            <DetailValue>
                                {this.props.devices.length}
                            </DetailValue>
                        </DetailRow>
                        {/* <DetailRow>
              <DetailKey>Total Packets:</DetailKey>
              <DetailValue>20112</DetailValue>
            </DetailRow> */}
                        <DetailRow>
                            <DetailKey>Total Data Streams:</DetailKey>
                            <DetailValue>
                                {this.props.devices[0]
                                    ? this.props.devices
                                          .map(
                                              device => device.dataTypes.length
                                          )
                                          .reduce((a, b) => a + b)
                                    : '--'}
                            </DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Owner:</DetailKey>
                            <DetailValue>
                                {this.props.user.displayName}
                            </DetailValue>
                        </DetailRow>
                    </div>
                </Details>
                {this.props.userData && (
                    <Details>
                        <DetailRow>
                            <DetailKey>Your API Key:</DetailKey>
                            <Clipboard
                                style={{ background: 'none', display: 'block' }}
                                data-clipboard-text={this.props.userData.apiKey}
                                onSuccess={() =>
                                    this.alert('Successfully Copied')
                                }
                            >
                                <CopyBox>
                                    {this.props.userData.apiKey
                                        ? this.props.userData.apiKey.substr(
                                              0,
                                              20
                                          ) + '...'
                                        : '--'}
                                </CopyBox>
                            </Clipboard>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Your User ID:</DetailKey>
                            <Clipboard
                                style={{ background: 'none', display: 'block' }}
                                data-clipboard-text={this.props.user.uid}
                                onSuccess={() =>
                                    this.alert('Successfully Copied')
                                }
                            >
                                <CopyBox>
                                    {this.props.user.uid &&
                                        this.props.user.uid.substr(0, 18) +
                                            '...'}
                                </CopyBox>
                            </Clipboard>
                        </DetailRow>
                        <Alert {...this.state}>{this.state.alertMessage}</Alert>

                        <DetailRow>
                            <Link to="https://marketplace.tangle.works">
                                <a
                                    href="https://marketplace.tangle.works"
                                    target="_blank"
                                >
                                    <DetailKey>
                                        View the API documentation
                                    </DetailKey>
                                </a>
                            </Link>
                        </DetailRow>
                    </Details>
                )}
                {this.props.grandfather && (
                    <Details>
                        <Grandfather onClick={() => this.props.toggleGrand()}>
                            Grandfather Old Device
                        </Grandfather>
                    </Details>
                )}
            </Sidebar>
        )
    }
}

const Alert = styled.span`
    font-size: 16px;
    line-height: 32px;
    color: #595959ff;
    opacity: ${props => (props.alert ? 1 : 0)};
    transition: all 0.5s ease;
`

const CopyBox = DetailValue.extend`
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        opacity: 0.6;
    }
`
const Grandfather = styled.button`
    color: ${props =>
        props.grey ? `rgba(41, 41, 41, 0.4)` : `rgba(41, 41, 41, 0.9)`};
    padding: 5px 15px;
    margin-right: -15px;
    font-size: 90%;
    background: transparent;
    &:first-of-type {
        margin-left: -15px;
        margin-right: 0;
    }
`
const A = styled.a`
    text-decoration: none;
`

const More = styled.div`
    color: white;
    padding: 20px 20px 10px;
    margin: 10px 0 20px;
`

const Fetcher = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    justify-content: center;
    @media (max-width: 760px) {
        display: none;
    }
`

const Loading = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 38 38"
            stroke="#fff"
        >
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                    <path
                        d="M36 18c0-9.94-8.06-18-18-18"
                        transform="rotate(319.698 18 18)"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </g>
        </svg>
    )
}
