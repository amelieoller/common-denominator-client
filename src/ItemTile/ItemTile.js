import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useCategories from "../hooks/useCategories";
import Tile from "../Tile/Tile";

const ItemTile = ({ item }) => {
  const { deleteItem, updateItem, updateItemRating } = useCategories();

  const [title, setTitle] = useState(item.title);
  const [rating, setRating] = useState(item.currentUserRating.value);

  const handleDelete = () => {
    deleteItem(item);
  };

  const handleOnTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOnRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleOnTitleBlur = () => {
    if (item.title === title) return;

    updateItem({ ...item, title });
  };

  const handleOnRatingBlur = () => {
    if (item.currentUserRating.value === rating) return;

    updateItemRating(item, { ...item.currentUserRating, value: +rating });
  };

  return (
    <Tile>
      <input
        value={title}
        onChange={handleOnTitleChange}
        onBlur={handleOnTitleBlur}
        type="text"
      />

      <input
        value={rating}
        onChange={handleOnRatingChange}
        onBlur={handleOnRatingBlur}
        type="number"
        max={10}
        min={0}
      />

      <button className="pure-button" onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </button>
    </Tile>
  );
};

ItemTile.propTypes = {};

export default ItemTile;
