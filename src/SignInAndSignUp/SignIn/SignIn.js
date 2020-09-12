import React, { Component, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../../components/Firebase";
import * as ROUTES from "../../constants/routes";

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

  const onSubmit = (event) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);

        history.push(ROUTES.GROUPS);
      })
      .catch((error) => {
        setError(error);
      });

    event.preventDefault();
  };

  const isInvalid = password === "" || email === "";

  return (
    <div className="splash">
      <h2 className="content-head content-head-ribbon">Sign In</h2>

      <form onSubmit={onSubmit} className="pure-form pure-form-stacked">
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

        <p>
          <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </p>

        <button disabled={isInvalid} type="submit" className="pure-button">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>

      <SignInGoogle history={history} firebase={firebase} />

      <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
    </div>
  );
};

const SignInGoogle = ({ firebase, history }) => {
  const [error, setError] = useState(null);

  const handleSignInWithGoogle = (event) => {
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
      .then(() => {
        setError(null);
        history.push(ROUTES.GROUPS);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        setError(error);
      });

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSignInWithGoogle}>
      <button type="submit" className="pure-button">
        Sign In with Google
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default compose(withRouter, withFirebase)(SignInPage);
