import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Title = ({ children, backButtonText, backLink }) => {
  return (
    <StyledTitle>
      {backButtonText && (
        <BackButtonWrapper to={backLink}>
          <button className="pure-button pure-button-primary">
            <i className="fas fa-arrow-left"></i>
            <span>
              Back to <br />
              {backButtonText}
            </span>
          </button>
        </BackButtonWrapper>
      )}

      {children}
    </StyledTitle>
  );
};

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;

  h1 {
    margin: 0;
  }
`;

const BackButtonWrapper = styled(Link)`
  text-decoration: none;
  font-size: 13px;

  button {
    line-height: 13px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    i {
      margin-right: 5px;
    }
  }
`;

Title.propTypes = {};

export default Title;
