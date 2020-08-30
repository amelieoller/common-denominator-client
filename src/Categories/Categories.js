import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import Category from "../Category/Category";
import NewCategory from "../NewCategory/NewCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/categories`;

    fetch(url)
      .then((resp) => resp.json())
      .then(({ data }) => {
        setCategories(data);
      });
  }, []);

  return (
    <StyledCategories>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}

      <NewCategory />
    </StyledCategories>
  );
};

const StyledCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: ${({ theme }) => theme.padding};
`;

Categories.propTypes = {};

export default Categories;
