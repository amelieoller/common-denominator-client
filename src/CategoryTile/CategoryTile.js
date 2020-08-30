import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const CategoryTile = ({ category }) => {
  const handleDelete = () => {
    const options = { method: "DELETE" };
    const url = `${process.env.REACT_APP_SERVER_URL}/categories/${category.id}`;

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  return (
    <StyledCategoryTile>
      <Link to={`categories/${category.title.toLowerCase()}`}>
        <span>{category.title}</span>
      </Link>

      <StyledButton className="pure-button" onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </StyledButton>
    </StyledCategoryTile>
  );
};

const StyledCategoryTile = styled.div`
  height: 200px;
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
`;

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid;
  border-radius: ${({ theme }) => theme.borderRadiusSmall};
  padding: 3px 6px;
  color: ${({ theme }) => theme.onBackground};
  font-size: 12px;
`;

CategoryTile.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        currentUserRating: PropTypes.shape({
          id: PropTypes.number.isRequired,
          value: PropTypes.number.isRequired,
        }),
      })
    ).isRequired,
  }),
};

export default CategoryTile;
