import React from "react"
import styled from "styled-components"

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
  font: 15px "Nunito Sans", sans-serif;
  letter-spacing: 0.47px;
  padding: 20px 38px;
  border-radius: 100px;
  text-transform: uppercase;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.38px;
  padding: 12px 21px;
  box-shadow: 0 10px 20px 0 #0a2056;
  font-weight: 700;
  background-color: #009fff;
`
export default class extends React.Component {
  render() {
    return (
      <Modal className="access-modal-wrapper">
        <AccessBox className="access-modal">
          <img
            src="/static/icons/icon-padlock.png"
            srcSet="/static/icons/icon-padlock@2x.png 2x"
            alt="Icon padlock"
          />
          <Heading>Access Required</Heading>
          <Info>
            Mauris non tempor quam, et lacinia sapien. Mauris accumsan.
          </Info>
          <Button
            type="button"
            className="btn btn-accent txt-bold modal-trigger"
          >
            Purchase Access for $0.01
          </Button>
        </AccessBox>
      </Modal>
    )
  }
}
