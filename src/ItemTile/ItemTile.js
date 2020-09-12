import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useCategories from "../hooks/useCategories";
import Tile from "../Tile/Tile";

const ItemTile = ({
  item,
  deleteItem,
  updateItem,
  updateItemRating,
  userId,
}) => {
  const [title, setTitle] = useState(item.title);
  const [rating, setRating] = useState(item?.ratings[userId] || 0);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    let interval;

    if (!saved) {
      interval = setInterval(() => {
        handleOnRatingBlur();
      }, 2500);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, saved]);

  const handleDelete = () => {
    deleteItem(item);
  };

  const handleOnTitleChange = (e) => {
    setTitle(e.target.value);
    if (saved) setSaved(false);
  };

  const handleOnRatingChange = (e) => {
    setRating(e.target.value);
    if (saved) setSaved(false);
  };

  const increment = () => {
    if (rating >= 5) return;
    setRating((prevRating) => prevRating + 1);
    if (saved) setSaved(false);
  };

  const decrement = () => {
    if (rating <= 0) return;
    setRating((prevRating) => prevRating - 1);
    if (saved) setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleOnRatingBlur();
    handleOnTitleBlur();
  };

  const handleOnTitleBlur = () => {
    if (saved) return;

    setSaved(true);
    updateItem(title);
  };

  const handleOnRatingBlur = () => {
    if (saved) return;

    setSaved(true);
    updateItemRating(+rating);
  };

  return (
    <Tile>
      <FormWrapper>
        <TitleForm onSubmit={handleSubmit} className="pure-form">
          <textarea
            className="pure-input"
            placeholder="Item Title"
            onChange={handleOnTitleChange}
            onBlur={handleOnTitleBlur}
            defaultValue={title}
          ></textarea>

          <FormButtons>
            <button
              type="submit"
              className={
                saved
                  ? "pure-button pure-button-disabled"
                  : "pure-button button-success"
              }
            >
              <i className="fas fa-save"></i>
            </button>

            <button className="pure-button button-error" onClick={handleDelete}>
              <i className="fas fa-trash"></i>
            </button>
          </FormButtons>
        </TitleForm>

        <RatingWrapper>
          <i className="fas fa-arrow-up" onClick={increment}></i>

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

          <i className="fas fa-arrow-down" onClick={decrement}></i>
        </RatingWrapper>
      </FormWrapper>
    </Tile>
  );
};

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const TitleForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  textarea {
    resize: none;
    width: 100%;
    height: 100%;
    margin-bottom: 15px;
    border: none;
    box-shadow: none;
    background: transparent;
  }
`;

const FormButtons = styled.div`
  button[type="submit"] {
    margin: 0;
  }

  & > button[type="submit"]:first-child {
    margin-right: 10px;
  }
`;

const RatingWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #777;
  font-size: 18px;
  margin-left: 15px;

  i {
    cursor: pointer;

    &:hover {
      color: #a9a9a9;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input {
    border: none;
    background: transparent;
    font-size: 28px;
    text-align: center;
  }
`;

ItemTile.propTypes = {};

export default ItemTile;
