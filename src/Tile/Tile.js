import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Tile = ({ children, ...props }) => {
  return <StyledItemTile {...props}>{children}</StyledItemTile>;
};

const StyledItemTile = styled.div`
  background: white;
  height: 130px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.padding};
  cursor: ${({ isLinkable }) => isLinkable && "pointer"};

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
