import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LandingPage from "./components/Landing";
import HomePage from "./components/Home";
import * as ROUTES from "./constants/routes";
import { withAuthentication } from "./Session";
import Navbar from "./Navbar/Navbar";
import SignInPage from "./SignInAndSignUp/SignIn/SignIn";
import SignUpPage from "./SignInAndSignUp/SignUp/SignUp";
import Account from "./Account/Account";
import PasswordForgetPage from "./Password/PasswordForget/PasswordForget";
import GroupsPage from "./Groups/GroupsPage";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyle from "./GlobalStyle";

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />

      <Switch>
        <Route exact path={ROUTES.HOME} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.GROUPS} component={GroupsPage} />
        <Route path={ROUTES.ITEMS} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
      </Switch>
    </ThemeProvider>
  </Router>
);

export default withAuthentication(App);
