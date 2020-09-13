import React, { useState, useEffect } from "react";
import Spinner from "../../atoms/Spinner/Spinner";

import { withFirebase } from "../../components/Firebase";
import useFormInput from "../../hooks/useFormInput";

const PasswordForgetPage = () => (
  <div className="splash">
    <h1 className="content-head content-head-ribbon">Reset Your Password</h1>
    <PasswordForgetForm />
  </div>
);

const PasswordForgetFormBase = ({ firebase }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [email, bindEmail, resetEmail] = useFormInput("");

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 5000);
    if (message) setTimeout(() => setMessage(null), 5000);
  }, [error, message]);

  const onSubmit = (e) => {
    setLoading(true);

    firebase
      .doPasswordReset(email)
      .then((test) => {
        resetEmail();
        setMessage("Email was sent, please check your inbox.");
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    e.preventDefault();
  };

  const isInvalid = email === "";

  return (
    <>
      <h4 style={{ margin: 0, textAlign: "left" }}>Reset Password</h4>
      {error && <div className="notification error">{error.message}</div>}
      {message && <div className="notification">{message}</div>}

      <form className="pure-form inline-form" onSubmit={onSubmit}>
        <input
          name="email"
          {...bindEmail}
          type="text"
          placeholder="Email Address"
        />
        <button
          disabled={isInvalid}
          type="submit"
          className="pure-button pure-button-primary"
        >
          {loading ? <Spinner small /> : "Reset Password"}
        </button>
      </form>
    </>
  );
};

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm };
