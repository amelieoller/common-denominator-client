import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import ItemTile from "../ItemTile/ItemTile";
import Tiles from "../Tiles/Tiles";
import useCategories from "../hooks/useCategories";
import NewTile from "../NewTile/NewTile";

const Items = ({ category }) => {
  const { deleteItem, updateItem, updateItemRating, addItem } = useCategories();

  const handleAddNewItem = (text) => {
    addItem(category.id, { title: text, category_id: category.id });
  };

  return (
    <StyledItems>
      <h1 className="content-head content-head-ribbon">{category.title}</h1>

      <Tiles>
        {category.items.map((item) => (
          <ItemTile
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            updateItem={updateItem}
            updateItemRating={updateItemRating}
          />
        ))}

        <NewTile
          handleAddNewItem={handleAddNewItem}
          placeholderText="Add New Item"
          buttonText="Add"
        />
      </Tiles>
    </StyledItems>
  );
};

const StyledItems = styled.div`
  width: 80%;
  margin: 0 auto;
`;

Items.propTypes = {
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
  ),
};

export default Items;
