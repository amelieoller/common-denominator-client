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
  border: 1px solid ${({ theme }) => theme.grey};
  display: ${({ isLinkable }) => isLinkable && "flex"};
  align-items: ${({ isLinkable }) => isLinkable && "flex-end"};
  justify-content: ${({ isLinkable }) => isLinkable && "space-between"};

  h2 {
    margin: 0;
    color: ${({ isLinkable, theme }) =>
      isLinkable ? theme.primary : theme.dark};
  }

  a {
    cursor: pointer;
  }

  &:hover {
    background: ${({ isLinkable, addCursor, theme }) =>
      (isLinkable || addCursor) && theme.greyLight};

    h2 {
      color: ${({ isLinkable, theme }) => isLinkable && theme.primaryDark};
    }
  }
`;

Tile.propTypes = {};

export default Tile;
