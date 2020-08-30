import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import CategoryTile from "../CategoryTile/CategoryTile";
import NewCategory from "../NewCategory/NewCategory";

const Categories = ({ categories }) => (
  <StyledCategories>
    {categories.map((category) => (
      <CategoryTile category={category} key={category.id} />
    ))}

    <NewCategory />
  </StyledCategories>
);

const StyledCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: ${({ theme }) => theme.padding};
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
  ).isRequired,
};

export default Categories;