import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { theme } from "./theme";
import GlobalStyle from "./GlobalStyle";
import CategoriesPage from "./CategoriesPage/CategoriesPage";
import Navbar from "./Navbar/Navbar";
import useFirebase from "./hooks/useFirebase";
import Login from "./Login/Login";
import useCategories from "./hooks/useCategories";
import FriendsPage from "./FriendsPage/FriendsPage";
import * as ROUTES from "./constants/routes";

const App = () => {
  const { user } = useFirebase();
  const { getCategories } = useCategories();

  useEffect(() => {
    if (user) {
      getCategories(user.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <StyledApp>
          <GlobalStyle />

          {/* {user ? (
            <> */}
          <Navbar />

          <div className="splash-container">
            {!user ? (
              <Switch>
                <Route exact path={ROUTES.HOME} component={Login} />
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              </Switch>
            ) : (
              <Switch>
                <Route path="/categories" component={CategoriesPage} />
                <Route path="/friends" component={FriendsPage} />
                <Redirect
                  to={{
                    pathname: "/friends",
                  }}
                />
              </Switch>
            )}
          </div>
          {/* </>
          ) : (
            "loading"
          )} */}
        </StyledApp>
      </ThemeProvider>
    </Router>
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
