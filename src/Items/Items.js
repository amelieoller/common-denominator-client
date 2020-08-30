import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import ItemTile from "../ItemTile/ItemTile";
import NewItem from "../NewItem/NewItem";

const Items = ({ categoryId, items }) => (
  <StyledItems>
    {items.map((item) => (
      <ItemTile item={item} key={item.id} />
    ))}

    <NewItem categoryId={categoryId} />
  </StyledItems>
);

const StyledItems = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.padding};
`;

Items.propTypes = {
  categoryId: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      currentUserRating: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      }).isRequired,
      category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Items;
