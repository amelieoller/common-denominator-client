import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Tile = ({ children }) => {
  return <StyledItemTile>{children}</StyledItemTile>;
};

const StyledItemTile = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: tomato;
  padding: ${({ theme }) => theme.padding};

  a {
    color: ${({ theme }) => theme.onBackground};

    &:hover {
      text-decoration: underline;
    }
  }

  input {
    background: transparent;
    color: ${({ theme }) => theme.onBackground};
    border-radius: ${({ theme }) => theme.borderRadiusSmall};
    border: 1px solid;
    padding: 4px 8px;
  }

  input::placeholder {
    color: ${({ theme }) => theme.onBackground};
  }

  button {
    background: transparent;
    border: 1px solid;
    border-radius: ${({ theme }) => theme.borderRadiusSmall};
    padding: 3px 6px;
    color: ${({ theme }) => theme.onBackground};
    font-size: 12px;
  }
`;

Tile.propTypes = {};

export default Tile;
