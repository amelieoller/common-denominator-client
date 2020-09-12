import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Tile = ({ children }) => {
  return <StyledTiles>{children}</StyledTiles>;
};

const StyledTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
`;

Tile.propTypes = {};

export default Tile;
