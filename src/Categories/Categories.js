import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import CategoryTile from "../CategoryTile/CategoryTile";
import useCategories from "../hooks/useCategories";
import Tiles from "../Tiles/Tiles";
import NewTile from "../NewTile/NewTile";
import useAuth from "../hooks/useAuth";

const Categories = () => {
  const { categories, addCategory } = useCategories();
  const { user } = useAuth();

  const handleAddNewItem = (title) => {
    addCategory({ title, user_id: user.id });
  };

  return categories ? (
    <StyledCategories>
      <h1 className="content-head content-head-ribbon">Categories</h1>

      <Tiles>
        {categories.map((category) => (
          <CategoryTile category={category} key={category.id} />
        ))}

        <NewTile
          handleAddNewItem={handleAddNewItem}
          placeholderText="Add New Item"
          buttonText="Add"
        />
      </Tiles>
    </StyledCategories>
  ) : (
    "loading"
  );
};

const StyledCategories = styled.div`
  width: 80%;
  margin: 0 auto;
`;

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export default Categories;
