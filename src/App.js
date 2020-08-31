import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { theme } from "./theme";
import GlobalStyle from "./GlobalStyle";
import CategoriesPage from "./CategoriesPage/CategoriesPage";
import Navbar from "./Navbar/Navbar";
import HomePage from "./HomePage/HomePage";
import { CategoriesProvider } from "./context/CategoriesContext";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CategoriesProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <StyledApp>
            <GlobalStyle />

            <Navbar />

            <StyledMain>
              <Switch>
                <Route path="/categories" component={CategoriesPage} />
                <Route exact path="/" component={HomePage} />
                <Route>Page Not Found</Route>
              </Switch>
            </StyledMain>
          </StyledApp>
        </ThemeProvider>
      </Router>
    </CategoriesProvider>
  );
};

const StyledApp = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const StyledMain = styled.div`
  padding: ${({ theme }) => theme.padding};
`;

export default App;
