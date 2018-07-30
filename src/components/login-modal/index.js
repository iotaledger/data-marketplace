import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loading from '../loading';

export default props => (
  <Modal className="access-modal-wrapper" show={props.show}>
    {!props.loading ? (
      <AccessBox>
        {!props.error ? (
          <Internal>
            <Heading>Login with OAuth</Heading>
            <Info>Click one of the login buttons below to generate an account.</Info>
            <SignupButton onClick={props.auth} src={`/static/icons/btn_google.png`} />
          </Internal>
        ) : (
          <Internal>
            <Heading>{props.error.heading}</Heading>
            <Info>{props.error.body}</Info>
            {props.button && (
              <Link to={'/'}>
                <Button type="button" className="btn btn-accent txt-bold modal-trigger">
                  Go back
                </Button>
              </Link>
            )}
          </Internal>
        )}
      </AccessBox>
    ) : (
      <AccessBox className="access-modal">
        <Heading>{props.loading.heading || '--'} </Heading>
        <Info>{props.loading.body || '--'}</Info>
        <Loading />
      </AccessBox>
    )}
  </Modal>
);

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
`;

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
`;

const Heading = styled.p`
  font-size: 28px;
  font-weight: 100;
  line-height: 42px;
  margin-bottom: 12px;
  text-align: center;
  color: #009fff;
`;

const Info = styled.p`
  font-size: 17px;
  line-height: 28px;
  color: #fff;
  text-align: center;
  margin-bottom: auto;
`;

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
`;

const Internal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SignupButton = styled.img`
  width: 80%;
  margin: 10px 0 0;
`;
