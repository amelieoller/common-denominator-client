import React, { useState, useEffect } from "react";

import { withFirebase } from "../../components/Firebase";

const PasswordChangeForm = ({ firebase }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 5000);
  }, [error]);

  const onSubmit = (event) => {
    firebase
      .doPasswordUpdate(password)
      .then(() => {
        setPassword("");
        setPasswordConfirmation("");
        setError(null);
      })
      .catch(setError);

    event.preventDefault();
  };

  const isInvalid = password !== passwordConfirmation || password === "";

  return (
    <>
      <h4 style={{ margin: 0, textAlign: "left" }}>Update Password</h4>
      {error && <div className="notification error">{error.message}</div>}

      <form className="pure-form inline-form" onSubmit={onSubmit}>
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

        <button
          disabled={isInvalid}
          type="submit"
          className="pure-button pure-button-primary"
        >
          Update Password
        </button>
      </form>
    </>
  );
};

export default withFirebase(PasswordChangeForm);
