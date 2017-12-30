import React from 'react'
import styled from 'styled-components'
import { Link } from '../../routes'

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? 1 : 0)};
  transition: all 0.5s ease;
  background-color: rgba(14, 56, 160, 0.6);
`
const AccessBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 280px;
  padding: 30px;
  border-radius: 6px;
  background-color: rgba(10, 32, 86, 0.9);
  box-shadow: 0 23px 50px 0 rgba(25, 54, 80, 0.1);
`
const Heading = styled.p`
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  text-align: center;
  color: #009fff;
`
const Info = styled.p`
  font-size: 17px;
  line-height: 28px;
  color: #fff;
  text-align: center;
  margin-bottom: auto;
`
const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font: 15px 'Nunito Sans', sans-serif;
  letter-spacing: 0.47px;
  padding: 20px 38px;
  border-radius: 100px;
  text-transform: uppercase;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.38px;
  padding: 12px 21px;
  margin: 30px 0 0;
  box-shadow: 0 10px 20px 0 #0a2056;
  font-weight: 700;
  background-color: #009fff;
`
const Internal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export default class extends React.Component {
  render() {
    return (
      <Modal className="access-modal-wrapper" show={this.props.show}>
        {!this.props.loading ? (
          <AccessBox>
            {!this.props.error ? (
              <Internal>
                <img
                  src="/static/icons/icon-padlock.png"
                  srcSet="/static/icons/icon-padlock@2x.png 2x"
                  alt="Icon padlock"
                />
                <Heading>Purchase device stream</Heading>
                <Info>
                  You can purchase access to this device's data stream by
                  clicking below.
                </Info>
                <Button
                  type="button"
                  className="btn btn-accent txt-bold modal-trigger"
                  onClick={() => this.props.auth('google')}
                >
                  Login with Google
                </Button>
              </Internal>
            ) : (
              <Internal>
                <Heading>{this.props.error.heading}</Heading>
                <Info>{this.props.error.body}</Info>
                {this.props.button && (
                  <Link route={'/'}>
                    <Button
                      type="button"
                      className="btn btn-accent txt-bold modal-trigger"
                    >
                      Go back
                    </Button>
                  </Link>
                )}
              </Internal>
            )}
          </AccessBox>
        ) : (
          <AccessBox className="access-modal">
            <Heading>{this.props.loading.heading || '--'} </Heading>
            <Info>{this.props.loading.body || '--'}</Info>
            <Loading />
          </AccessBox>
        )}
      </Modal>
    )
  }
}

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
