import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Tile = ({ children }) => {
  return <StyledTiles>{children}</StyledTiles>;
};

const StyledTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: ${({ theme }) => theme.padding};

  a {
    text-decoration: none;
    color: #1f8dd6;

    h2 {
      color: #1f8dd6;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

Tile.propTypes = {};

export default Tile;
