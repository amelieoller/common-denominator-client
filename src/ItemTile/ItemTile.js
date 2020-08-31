import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import useCategories from "../hooks/useCategories";

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
    <StyledItemTile>
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

      <StyledButton className="pure-button" onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </StyledButton>
    </StyledItemTile>
  );
};

const StyledItemTile = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: tomato;
  padding: ${({ theme }) => theme.padding};

  a {
    color: ${({ theme }) => theme.onBackground};

    &:hover {
      text-decoration: underline;
    }
  }

  input {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.onBackground};
    width: 100px;
  }
`;

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.borderRadiusSmall};
  padding: 3px 6px;
  color: ${({ theme }) => theme.onBackground};
  font-size: 12px;
`;

ItemTile.propTypes = {};

export default ItemTile;
