import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Clipboard from 'react-clipboard.js';

class UserSidebar extends Component {
  state = { alert: false, alertMessage: '' };

  alert = text => {
    this.setState({ alert: text, alertMessage: text }, () =>
      setTimeout(() => this.setState({ alert: false, alertMessage: text }), 1500)
    );
  };

  render() {
    const { settings, devices, user, userData, grandfather, toggleGrand } = this.props;
    return (
      <Sidebar>
        <Details>
          <Label>Your Statistics:</Label>
          <div>
            <DetailRow>
              <DetailKey>Number of Devices:</DetailKey>
              <DetailValue>{devices.length}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailKey>Total Data Streams:</DetailKey>
              <DetailValue>
                {devices[0]
                  ? devices.map(device => device.dataTypes.length).reduce((a, b) => a + b)
                  : '--'}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailKey>Owner:</DetailKey>
              <DetailValue>{user.displayName}</DetailValue>
            </DetailRow>
          </div>
        </Details>
        {userData && (
          <Details>
            <DetailRow>
              <DetailKey>Your API Key:</DetailKey>
              <Clipboard
                style={{ background: 'none', display: 'block' }}
                data-clipboard-text={userData.apiKey}
                onSuccess={() => this.alert('Successfully Copied')}
              >
                <CopyBox>{userData.apiKey ? `${userData.apiKey.substr(0, 20)}...` : '--'}</CopyBox>
              </Clipboard>
            </DetailRow>
            <DetailRow>
              <DetailKey>Your User ID:</DetailKey>
              <Clipboard
                style={{ background: 'none', display: 'block' }}
                data-clipboard-text={user.uid}
                onSuccess={() => this.alert('Successfully Copied')}
              >
                <CopyBox>{user.uid && `${user.uid.substr(0, 18)}...`}</CopyBox>
              </Clipboard>
            </DetailRow>
            <Alert {...this.state}>{this.state.alertMessage}</Alert>

            <DetailRow>
              {settings ? (
                <a
                  href={`https://${settings.domainName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DetailKey>View the API documentation</DetailKey>
                </a>
              ) : null}
            </DetailRow>
          </Details>
        )}
        {grandfather && (
          <Details>
            <Grandfather onClick={toggleGrand}>Grandfather Old Device</Grandfather>
          </Details>
        )}
      </Sidebar>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(UserSidebar);

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
`;

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
`;

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
`;

const DetailRow = styled.div`
  @media (max-width: 760px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const DetailKey = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: #738fd4;
`;

const DetailValue = styled.p`
  font-size: 16px;
  line-height: 32px;
  color: #595959ff;
`;

const Alert = styled.span`
  font-size: 16px;
  line-height: 32px;
  color: #595959ff;
  opacity: ${props => (props.alert ? 1 : 0)};
  transition: all 0.5s ease;
`;

const CopyBox = DetailValue.extend`
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.6;
  }
`;

const Grandfather = styled.button`
  color: ${props => (props.grey ? `rgba(41, 41, 41, 0.4)` : `rgba(41, 41, 41, 0.9)`)};
  padding: 5px 15px;
  margin-right: -15px;
  font-size: 90%;
  background: transparent;
  &:first-of-type {
    margin-left: -15px;
    margin-right: 0;
  }
`;
