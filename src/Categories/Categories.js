import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import CategoryTile from "../CategoryTile/CategoryTile";
import NewCategory from "../NewCategory/NewCategory";
import useCategories from "../hooks/useCategories";
import Tiles from "../Tiles/Tiles";

const Categories = () => {
  const { categories } = useCategories();

  return categories ? (
    <StyledCategories>
      <h1 className="content-head content-head-ribbon">Categories</h1>

      <Tiles>
        {categories.map((category) => (
          <CategoryTile category={category} key={category.id} />
        ))}

        <NewCategory />
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
