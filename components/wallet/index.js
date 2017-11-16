import React from 'react'
import styled from 'styled-components'
import { initWallet, purchase, reducer } from '../../lib/iota'

const Desc = styled.span`
  font: 12px/16px 'Nunito Sans', sans-serif;
  color: #808b92;
`

const Balance = styled.span`
  font-size: 24px;
  line-height: 42px;
  position: relative;
  top: -4px;
  color: #009fff;
  @media (max-width: 760px) {
    font-size: 15px;
    top: -4px;
  }
`
const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font: 15px 'Nunito Sans', sans-serif;
  letter-spacing: 0.47px;
  border-radius: 100px;
  text-transform: uppercase;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.38px;
  padding: 9px 10px;
  margin: 8px 0 0;
  box-shadow: 0 2px 10px 0 rgba(10, 32, 86, 0.3);
  font-weight: 700;
  background-color: #009fff;
  @media (max-width: 760px) {
    margin: 3px 0;
  }
`
export default class extends React.Component {
  state = {
    desc: `Loading wallet`,
    wallet: { amount: 0 },
    walletInit: false,
    walletLoading: true
  }

  componentWillReceiveProps = props => {
    this.setState({ ...props })
  }

  render() {
    var { desc, walletInit, walletLoading, wallet } = this.state
    if (walletLoading) {
      return (
        <Block>
          <Desc>{desc}</Desc>
          <Loading />
        </Block>
      )
    } else {
      return (
        <Block>
          <Desc>{desc}</Desc>
          {walletInit ? (
            <Balance>{reducer(wallet.amount)}</Balance>
          ) : (
            <Button onClick={() => this.props.fund()}>Fund Wallet</Button>
          )}
        </Block>
      )
    }
  }
}

const Loading = () => {
  return (
    <div style={{ margin: '8px 0 0 ' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 38 38"
        stroke="#0d3497"
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
    </div>
  )
}
