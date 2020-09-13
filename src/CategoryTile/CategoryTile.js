import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import useCategories from "../hooks/useCategories";
import Tile from "../Tile/Tile";

const CategoryTile = ({ category, history }) => {
  const { deleteCategory } = useCategories();

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteCategory(category.id);
  };

  const routeTo = (category) => {
    history.push(`categories/${category.slug}`);
  };

  return (
    <Tile isLinkable onClick={() => routeTo(category)}>
      <h2>{category.title}</h2>

      <button
        className="pure-button button-error icon-button"
        onClick={(e) => window.confirm("Are you sure?") && handleDelete(e)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </Tile>
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

export default withRouter(CategoryTile);
