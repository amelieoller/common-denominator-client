import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useFormInput from "../hooks/useFormInput";
import useAuth from "../hooks/useAuth";
import useFirebase from "../hooks/useFirebase";
import PasswordForget from "../PasswordForget/PasswordForget";

const Login = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
  } = useFirebase();

  const [username, bindUsername, resetUsername] = useFormInput("");
  const [password, bindPassword, resetPassword] = useFormInput("");

  const isInvalid = !password || !username;

  const handleLogin = (e) => {
    e.preventDefault();

    doSignInWithEmailAndPassword(username, password)
      .then((authUser) => {
        console.log(authUser);
        // debugger;
      })
      .catch((error) => {
        console.log(error);
      });

    // login({ username, password });

    resetUsername();
    resetPassword();
  };

  const handleSignup = (e) => {
    e.preventDefault();

    doCreateUserWithEmailAndPassword(username, password);
    // .then((authUser) => {
    //   console.log(authUser);

    //   firebase.user(authUser.user.uid).set({
    //     email: username,
    //   });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // signup({ user: { username, password } });

    resetUsername();
    resetPassword();
  };

  return (
    <div className="splash">
      <h2 className="content-head content-head-ribbon">
        {isLogin ? "Login" : "Signup"}
      </h2>

      <form
        onSubmit={isLogin ? handleLogin : handleSignup}
        className="pure-form pure-form-stacked"
      >
        <fieldset>
          {/* <label for="username">Your Username</label> */}
          <input
            {...bindUsername}
            id="username"
            type="text"
            placeholder="Your Username"
          />
          {/* <label for="password">Your Password</label> */}
          <input
            {...bindPassword}
            id="password"
            type="password"
            placeholder="Your Password"
          />

          <SignupOrLoginMessage>
            {isLogin ? (
              <>
                Don't have an account yet?{" "}
                <span
                  onClick={() => setIsLogin((prevLogin) => !prevLogin)}
                  className="link"
                >
                  Click here to sign up!
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin((prevLogin) => !prevLogin)}
                  className="link"
                >
                  Click here to log in!
                </span>
              </>
            )}
          </SignupOrLoginMessage>

          <button type="submit" className="pure-button" disabled={isInvalid}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </fieldset>
      </form>
      <PasswordForget />
    </div>
  );
};

const SignupOrLoginMessage = styled.div`
  margin-bottom: 15px;

  .link {
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #34495e;
    }
  }
`;

Login.propTypes = {};

export default Login;
