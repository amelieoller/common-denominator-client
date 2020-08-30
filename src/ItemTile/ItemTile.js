import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const ItemTile = ({ categoryId, item }) => {
  const [title, setTitle] = useState(item.title);
  const [rating, setRating] = useState(item.currentUserRating.value);

  const handleDelete = () => {
    const options = { method: "DELETE" };
    const url = `${process.env.REACT_APP_SERVER_URL}/categories/${categoryId}/items/${item.id}`;

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  const handleOnTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOnRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleOnTitleBlur = () => {
    if (item.title === title) return;

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, rating }),
    };
    const url = `${process.env.REACT_APP_SERVER_URL}/categories/${categoryId}/items/${item.id}`;

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  const handleOnRatingBlur = () => {
    if (item.currentUserRating.value === rating) return;

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: rating, itemId: item.id, user_id: 1 }),
    };

    const url = `${process.env.REACT_APP_SERVER_URL}/categories/${categoryId}/items/${item.id}/ratings/${item.currentUserRating.id}`;

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  return (
    <StyledItemTile>
      <input
        value={title}
        onChange={handleOnTitleChange}
        onBlur={handleOnTitleBlur}
      />

      <input
        value={rating}
        onChange={handleOnRatingChange}
        onBlur={handleOnRatingBlur}
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
