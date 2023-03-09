import React from "react";
import styled, { keyframes } from "styled-components";

const SpinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  padding: 25px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: #1e90ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${SpinnerAnimation} 0.6s linear infinite;
  margin: 0 auto;
`;

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default LoadingSpinner;
