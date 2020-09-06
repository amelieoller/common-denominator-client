import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useCategories from "../hooks/useCategories";
import Tile from "../Tile/Tile";

const ItemTile = ({ item }) => {
  const { deleteItem, updateItem, updateItemRating } = useCategories();

  const [title, setTitle] = useState(item.title);
  const [rating, setRating] = useState(item.currentUserRating.value);
  const [saved, setSaved] = useState(true);

  const handleDelete = () => {
    deleteItem(item);
  };

  const handleOnTitleChange = (e) => {
    setTitle(e.target.value);
    setSaved(false);
  };

  const handleOnRatingChange = (e) => {
    setRating(e.target.value);
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleOnRatingBlur();
    handleOnTitleBlur();
  };

  const handleOnTitleBlur = () => {
    if (item.title === title) return;

    setSaved(true);
    updateItem({ ...item, title });
  };

  const handleOnRatingBlur = () => {
    if (item.currentUserRating.value === rating) return;

    setSaved(true);
    updateItemRating(item, { ...item.currentUserRating, value: +rating });
  };

  return (
    <Tile>
      <ItemForm onSubmit={handleSubmit} className="pure-form">
        <fieldset>
          <div className="input-wrapper">
            <input
              value={title}
              onChange={handleOnTitleChange}
              onBlur={handleOnTitleBlur}
              type="text"
              placeholder="Item Title"
              className="title"
            />
            <input
              value={rating}
              onChange={handleOnRatingChange}
              onBlur={handleOnRatingBlur}
              type="number"
              max={5}
              min={0}
              placeholder="Rating"
              className="rating"
            />
          </div>

          {saved ? (
            <button className="pure-button pure-button-disabled">Saved</button>
          ) : (
            <button type="submit" className="pure-button pure-button-primary">
              Save
            </button>
          )}
        </fieldset>
      </ItemForm>

      <button className="pure-button button-error" onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </button>
    </Tile>
  );
};

const ItemForm = styled.form`
  fieldset {
    .input-wrapper {
      display: flex;

      .title {
      }

      input.rating {
        width: 50px;
        margin-left: 10px;
      }
    }
  }
`;

ItemTile.propTypes = {};

export default ItemTile;
