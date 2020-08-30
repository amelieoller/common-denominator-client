import React from "react";
import styled from "styled-components/macro";

import { Switch, Route } from "react-router-dom";
import Categories from "../Categories/Categories";
import ItemsPage from "../ItemsPage/ItemsPage";
// import { CategoriesProvider } from "../context/CategoriesContext";

const CategoriesPage = () => (
  <StyledCategoriesPage>
    <Switch>
      <Route exact path="/categories" component={Categories} />
      <Route path="/categories/:slug" component={ItemsPage} />
    </Switch>
  </StyledCategoriesPage>
);

const StyledCategoriesPage = styled.div``;

export default CategoriesPage;
