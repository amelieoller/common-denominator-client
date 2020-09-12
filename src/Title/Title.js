import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Title = ({ children, backButtonText, backLink }) => {
  return (
    <StyledTitle>
      {backButtonText && (
        <BackButton to={backLink}>
          <i className="fas fa-arrow-left"></i>
          <span>
            Back to <br />
            {backButtonText}
          </span>
        </BackButton>
      )}

      {children}
    </StyledTitle>
  );
};

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled(Link)`
  font-size: 13px;
  flex-wrap: wrap;
  display: inline-block;
  line-height: 13px;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.borderRadiusSmall};
  padding: 4px 8px;
  margin-right: 8px;
  cursor: pointer;
  text-decoration: none;
  color: #2d3e50;
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    margin-right: 5px;
  }

  &:hover {
    background: #d5d5d5;
  }
`;

Title.propTypes = {};

export default Title;
