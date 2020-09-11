import React, { useState } from "react";

import { withFirebase } from "../../components/Firebase";

const PasswordChangeForm = ({ firebase }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    firebase
      .doPasswordUpdate(password)
      .then(() => {
        setPassword("");
        setPasswordConfirmation("");
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });

    event.preventDefault();
  };

  const isInvalid = password !== passwordConfirmation || password === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordConfirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default withFirebase(PasswordChangeForm);
