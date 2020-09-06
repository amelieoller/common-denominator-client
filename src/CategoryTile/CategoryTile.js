import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import useCategories from "../hooks/useCategories";
import Tile from "../Tile/Tile";

const CategoryTile = ({ category }) => {
  const { deleteCategory } = useCategories();

  const handleDelete = () => {
    deleteCategory(category.id);
  };

  return (
    <Link to={`categories/${category.slug}`}>
      <Tile>
        <h2>{category.title}</h2>

        <button className="pure-button button-error" onClick={handleDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </Tile>
    </Link>
  );
};

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
