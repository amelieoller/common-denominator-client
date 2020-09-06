import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Tile = ({ children }) => {
  return <StyledItemTile>{children}</StyledItemTile>;
};

const StyledItemTile = styled.div`
  background: white;
  height: 150px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.padding};

  h2 {
    margin: 0;
  }

  a {
    cursor: pointer;
  }

  &:hover {
    background: #eee;
  }
`;

Tile.propTypes = {};

export default Tile;
