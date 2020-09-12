import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ItemTile from "../ItemTile/ItemTile";
import CategoryTile from "../CategoryTile/CategoryTile";
import Tile from "../Tile/Tile";

const Category = ({ group, firebase, category, history }) => {
  const handleDelete = (e) => {
    e.stopPropagation();

    firebase.category(group.uid, category.uid).delete();
  };

  const routeTo = (category) => {
    history.push(`/groups/${group.uid}/categories/${category.uid}/items`);
  };

  return (
    <Tile isLinkable onClick={() => routeTo(category)}>
      <h2>{category.title}</h2>

      <button className="pure-button button-error" onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </button>
    </Tile>
  );
};

Category.propTypes = {};

export default Category;
