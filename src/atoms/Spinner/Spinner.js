import React from "react";
import styled, { keyframes } from "styled-components/macro";

const Spinner = ({ small }) => {
  return (
    <StyledSpinner small={small}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </StyledSpinner>
  );
};

const bounceDelay = keyframes`
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

const StyledSpinner = styled.div`
  width: ${({ small }) => !small && "100px"};
  text-align: center;
  position: ${({ small }) => !small && "absolute"};
  top: 40%;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;

  > div {
    width: ${({ small }) => (small ? "10px" : "18px")};
    height: ${({ small }) => (small ? "10px" : "18px")};
    margin: ${({ small }) => (small ? "2px" : "5px")};
    background-color: ${({ theme, small }) =>
      small ? theme.primary : theme.secondary};

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: ${bounceDelay} 1.4s infinite ease-in-out both;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
`;

Spinner.propTypes = {};

export default Spinner;
