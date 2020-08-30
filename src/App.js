import React from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { theme } from "./theme";
import GlobalStyle from "./GlobalStyle";
import CategoriesPage from "./CategoriesPage/CategoriesPage";
import Navbar from "./Navbar/Navbar";

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />

        <Navbar />

        <StyledMain>
          <Switch>
            <Route path="/categories" component={CategoriesPage} />
            <Route exact path="/" render={() => "Home Page"} />
            <Route>Page Not Found</Route>
          </Switch>
        </StyledMain>
      </StyledApp>
    </ThemeProvider>
  </Router>
);

const StyledApp = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const StyledMain = styled.div`
  padding: ${({ theme }) => theme.padding};
`;

export default App;
