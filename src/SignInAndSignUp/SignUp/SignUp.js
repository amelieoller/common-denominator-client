import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components/macro";

import { withFirebase } from "../../components/Firebase";
import * as ROUTES from "../../constants/routes";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

const SignUpForm = ({ firebase, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 5000);
  }, [error]);

  const onSubmit = (event) => {
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return firebase.user(authUser.user.uid).set(
          {
            username,
            email,
          },
          { merge: true }
        );
      })
      .then(() => {
        return firebase.doSendEmailVerification();
      })
      .then(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
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

  const isInvalid =
    password !== passwordConfirmation ||
    password === "" ||
    email === "" ||
    username === "";

  return (
    <div className="splash">
      <h1 className="content-head content-head-ribbon">Sign Up</h1>

      <form onSubmit={onSubmit} className="pure-form pure-form-stacked">
        {error && <div className="notification error">{error.message}</div>}

        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
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
        <input
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          placeholder="Password Confirmation"
        />

        <button
          disabled={isInvalid}
          type="submit"
          className="pure-button pure-button-primary"
          style={{ display: "flex" }}
        >
          Sign Up
        </button>

        <Notification>
          Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </Notification>
      </form>
    </div>
  );
};

const Notification = styled.p`
  color: ${({ theme }) => theme.light};
  margin-top: ${({ theme }) => theme.paddingLarge};
`;

export default withRouter(withFirebase(SignUpForm));
