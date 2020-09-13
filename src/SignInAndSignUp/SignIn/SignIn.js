import React, { Component, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import styled from "styled-components/macro";

import { withFirebase } from "../../components/Firebase";
import * as ROUTES from "../../constants/routes";
import Spinner from "../../atoms/Spinner/Spinner";

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const SignInPage = ({ history, firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 5000);
  }, [error]);

  const onSubmit = (event) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);

        history.push(ROUTES.GROUPS);
      })
      .catch(setError);

    event.preventDefault();
  };

  const isInvalid = password === "" || email === "";

  if (loading) return <Spinner />;

  return (
    <div className="splash">
      <h1 className="content-head content-head-ribbon">Sign In</h1>

      <form onSubmit={onSubmit} className="pure-form pure-form-stacked">
        {error && <div className="notification">{error.message}</div>}

        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <SignInFooter>
          <button
            disabled={isInvalid}
            type="submit"
            className="pure-button pure-button-primary"
          >
            Sign In
          </button>

          <ForgotPasswordLink>
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Your Password?</Link>
          </ForgotPasswordLink>
        </SignInFooter>
      </form>

      <SignInGoogle
        history={history}
        firebase={firebase}
        setLoading={setLoading}
      />

      <Notification>
        Don't have an account yet? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </Notification>
    </div>
  );
};

const Notification = styled.p`
  color: ${({ theme }) => theme.light};
`;

const SignInFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignInGoogle = ({ firebase, history, setLoading }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 5000);
  }, [error]);

  const handleSignInWithGoogle = (event) => {
    setLoading(true);

    firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) => {
        // Create a user in your Firebase Realtime Database too

        return firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
          },
          { merge: true }
        );
      })
      .then(() => history.push(ROUTES.GROUPS))
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        setLoading(false);
        setError(error);
      });

    event.preventDefault();
  };

  return (
    <GoogleFormWrapper onSubmit={handleSignInWithGoogle}>
      <button type="submit" className="pure-button pure-button-primary">
        Sign in With Google
      </button>

      {error && <p>{error.message}</p>}
    </GoogleFormWrapper>
  );
};

const ForgotPasswordLink = styled.p`
  text-align: right;
`;

const GoogleFormWrapper = styled.form`
  margin: ${({ theme }) => theme.paddingLarge} 0;
`;

export default compose(withRouter, withFirebase)(SignInPage);
