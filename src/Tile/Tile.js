import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Tile = ({ children, ...props }) => {
  return <StyledItemTile {...props}>{children}</StyledItemTile>;
};

const StyledItemTile = styled.div`
  background: white;
  height: 160px;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.padding};
  cursor: ${({ isLinkable, addCursor }) =>
    (isLinkable || addCursor) && "pointer"};
  border: 1px solid #d7d7d7;
  display: ${({ isLinkable }) => isLinkable && "flex"};
  align-items: ${({ isLinkable }) => isLinkable && "flex-end"};
  justify-content: ${({ isLinkable }) => isLinkable && "space-between"};

  h2 {
    margin: 0;
    color: ${({ isLinkable }) => (isLinkable ? "#1f8dd6" : "black")};
  }

  a {
    cursor: pointer;
  }

  &:hover {
    background: #eee;

    h2 {
      text-decoration: ${({ isLinkable }) => isLinkable && "underline"};
    }
  }
`;

Tile.propTypes = {};

export default Tile;
