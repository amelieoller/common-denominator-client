import React, { useState } from "react";
import { withRouter } from "react-router-dom";

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
    <div>
      <h1>SignUp</h1>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Full Name"
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
          placeholder="Confirm Password"
        />

        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default withRouter(withFirebase(SignUpForm));
