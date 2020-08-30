import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

import { Switch, Route } from "react-router-dom";
import Categories from "../Categories/Categories";
import CategoryShow from "../CategoryShow/CategoryShow";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/categories`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <StyledCategoriesPage>
      <Switch>
        <Route
          exact
          path="/categories"
          render={() => <Categories categories={categories} />}
        />
        <Route
          path="/categories/:slug"
          render={({ match }) => {
            const slugName = match.params.slug.toLowerCase();
            const category = categories.find(
              (c) => c.title.toLowerCase() === slugName
            );

            return category ? <CategoryShow category={category} /> : "loading";
          }}
        />
      </Switch>
    </StyledCategoriesPage>
  );
};

const StyledCategoriesPage = styled.div``;

export default CategoriesPage;
