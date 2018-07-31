import React from 'react';
import styled from 'styled-components';
import Loading from '../loading';

export default ({ cardContent, error, errorContent, loading, show }) => (
  <Modal className="access-modal-wrapper" show={show}>
    {!loading ? (
      <AccessBox>{!error ? cardContent : errorContent}</AccessBox>
    ) : (
      <AccessBox className="access-modal">
        <Heading>{loading.heading || '--'} </Heading>
        <Info>{loading.body || '--'}</Info>
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
