import styled, { keyframes } from 'styled-components';
import React from 'react';
import arthLogo from '../../assets/svg/ARTH.svg';

const LoadingPage = () => {
  return (
    <MainDiv>
      <ElementConatiner>
        <LoadingIndicator></LoadingIndicator>
        <ArthLogo src={arthLogo} alt="ARTH" />
      </ElementConatiner>
    </MainDiv>

  );
};

const rotate = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(0.8);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const plus = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.8);
  }
  
  100% {
    transform: scale(1);
  }
`;

const MainDiv = styled.div`
  position: fixed;
  top: 72px;
  width: 100vw;
  height: calc(100vh - 72px);
  background: #00000099;
  z-index: 20;
`;

const ElementConatiner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const LoadingIndicator = styled.div`
  width: 100px;
  height: 100px;
  border: 3px solid transparent;
  border-top: 3px solid #fd5656;
  border-bottom: 3px solid #fd5656;
  border-right: 3px solid #fd5656;
  animation: ${rotate} 2s linear infinite;
  border-radius: 50%;
`

const ArthLogo = styled.img`
  width: 98px;
  height: 98px;
  animation: ${plus} 2s linear infinite;
  position: absolute;
  top:0;
`

export default LoadingPage;
