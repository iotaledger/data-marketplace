import React from 'react'
import styled from 'styled-components';
import { withCookies } from 'react-cookie';

class Cookie extends React.Component {
  state = { ack: true }

  componentDidMount() {
    const ack = this.props.cookies.get('dmp-ack');
    if (!ack) {
      document.body.classList.add('cookie-bar-top-bar');
      this.setState({ ack: false });
    }
  }

  dismiss = () => {
    this.props.cookies.set('dmp-ack', true, { path: '/' });
    document.body.classList.remove('cookie-bar-top-bar');
    this.setState({ ack: true })
  }

  render() {
    if (this.state.ack) return null;

    return (
      <Disclaimer>
        <DisclaimerText>
          This website uses cookies to ensure you get the best experience on our
          website.&nbsp;
          <DisclaimerLink href="https://www.iota.org/research/privacy-policy">
            Learn more
          </DisclaimerLink>
        </DisclaimerText>
        <DisclaimerButton className="button" onClick={this.dismiss}>Dismiss</DisclaimerButton>
      </Disclaimer>
    )
  }
}

export default withCookies(Cookie);


const Disclaimer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  background: #eeeeee;
  width: 100vw;
  padding: 8px 20px;
  height: 70px;
  z-index: 99999;
`;

const DisclaimerText = styled.span`
  font-size: 18px;
  color: #3f3f3f;
  white-space: normal;
  margin-right: 20px;

  @media (max-width: 660px) {
    font-size: 90% !important;
  }
`;

const DisclaimerButton = styled.button`
  width: 200px;
  height: 55px;
  background: #009fff;
  border-radius: 42px;
  border: none;
  line-height: 55px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  outline: none;
  text-transform: uppercase;

  &:hover {
    text-decoration: none;
    color:rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 660px) {
    line-height: 37px;
    height: 40px;
    font-size: 15px;
  }
`;

const DisclaimerLink = styled.a`
  font-weight: 600;
  font-size: 18px;
  color: #009fff;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  @media (max-width: 660px) {
    font-size: 90% !important;
  }
`;
