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
import useAuth from "./hooks/useAuth";
import Login from "./Login/Login";
import GetStarted from "./GetStarted/GetStarted";
import useCategories from "./hooks/useCategories";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { getCurrentUser, user } = useAuth();
  const { getCategories } = useCategories();

  useEffect(() => {
    getCurrentUser().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          {!loading ? (
            <>
              <Navbar />

              <StyledMain>
                {!user ? (
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Redirect
                      to={{
                        pathname: "/",
                      }}
                    />
                  </Switch>
                ) : (
                  <Switch>
                    <Route path="/categories" component={CategoriesPage} />
                    <Route exact path="/" component={GetStarted} />
                    <Route>Page Not Found</Route>
                  </Switch>
                )}
              </StyledMain>
            </>
          ) : (
            "loading"
          )}
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
