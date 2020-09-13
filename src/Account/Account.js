import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import styled from "styled-components/macro";

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { withFirebase } from "../components/Firebase";
import { PasswordForgetForm } from "../Password/PasswordForget/PasswordForget";
import PasswordChangeForm from "../Password/PasswordChange/PasswordChange";
import useFormInput from "../hooks/useFormInput";

const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null,
  },
  {
    id: "google.com",
    provider: "googleProvider",
  },
];

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div className="splash">
        <h1 className="content-head content-head-ribbon">Account</h1>

        <h3>{authUser.email}</h3>

        <PasswordForgetForm />
        <PasswordChangeForm />
        <LoginManagement authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const LoginManagementBase = ({ firebase, authUser }) => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSignInMethods = () => {
    firebase.auth
      .fetchSignInMethodsForEmail(authUser.email)
      .then(setActiveSignInMethods)
      .catch(setError);
  };

  useEffect(() => {
    fetchSignInMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 5000);
    if (message) setTimeout(() => setMessage(null), 5000);
  }, [error, message]);

  const onSocialLoginLink = (provider) => {
    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(() => {
        setMessage("Successfully linked sign in method");
        fetchSignInMethods();
      })
      .catch(setError);
  };

  const onDefaultLoginLink = (password) => {
    const credential = firebase.emailAuthProvider.credential(
      authUser.email,
      password
    );

    firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(fetchSignInMethods)
      .catch(setError);
  };

  const onUnlink = (providerId) => {
    firebase.auth.currentUser
      .unlink(providerId)
      .then(() => {
        setMessage("Successfully unlinked sign in method");
        fetchSignInMethods();
      })
      .catch(setError);
  };

  return (
    <div>
      <h2>Active Sign In Methods</h2>
      {error && <div className="notification error">{error.message}</div>}
      {message && <div className="notification">{message}</div>}

      <SignInMethodsWrapper>
        {SIGN_IN_METHODS.map((signInMethod) => {
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(signInMethod.id);

          return (
            <div key={signInMethod.id}>
              {signInMethod.id === "password" ? (
                <DefaultLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onDefaultLoginLink}
                  onUnlink={onUnlink}
                />
              ) : (
                <SocialLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onSocialLoginLink}
                  onUnlink={onUnlink}
                />
              )}
            </div>
          );
        })}
      </SignInMethodsWrapper>
    </div>
  );
};

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) => (
  <>
    <h4 style={{ margin: 0, textAlign: "left" }}>Google Login</h4>

    {isEnabled ? (
      <button
        disabled={onlyOneLeft}
        onClick={() => onUnlink(signInMethod.id)}
        className="pure-button pure-button-primary"
      >
        Deactivate {signInMethod.id}
      </button>
    ) : (
      <button
        type="button"
        onClick={() => onLink(signInMethod.provider)}
        className="pure-button pure-button-primary"
      >
        Link {signInMethod.id}
      </button>
    )}
  </>
);

const DefaultLoginToggle = ({
  onLink,
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onUnlink,
}) => {
  const [password, bindPassword, resetPassword] = useFormInput("");
  const [
    passwordConfirmation,
    bindPasswordConfirmation,
    resetPasswordConfirmation,
  ] = useFormInput("");

  const onSubmit = (e) => {
    e.preventDefault();

    onLink(password);
    resetPassword();
    resetPasswordConfirmation();
  };

  const isInvalid = password !== passwordConfirmation || password === "";

  return (
    <>
      <h4 style={{ margin: 0, textAlign: "left" }}>
        Password {"&"} Email Login
      </h4>

      {isEnabled ? (
        <button
          type="button"
          onClick={() => onUnlink(signInMethod.id)}
          disabled={onlyOneLeft}
          className="pure-button pure-button-primary"
        >
          Deactivate {signInMethod.id}
        </button>
      ) : (
        <form className="pure-form inline-form" onSubmit={onSubmit}>
          <input
            name="password"
            {...bindPassword}
            type="password"
            placeholder="New Password"
          />
          <input
            name="passwordConfirmation"
            {...bindPasswordConfirmation}
            type="password"
            placeholder="Confirm New Password"
          />

          <button
            disabled={isInvalid}
            type="submit"
            className="pure-button pure-button-primary"
          >
            Link {signInMethod.id}
          </button>
        </form>
      )}
    </>
  );
};

const SignInMethodsWrapper = styled.div`
  text-align: left;
`;

const LoginManagement = withFirebase(LoginManagementBase);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
