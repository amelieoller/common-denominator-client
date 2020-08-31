import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

import useFormInput from "../hooks/useFormInput";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { login, signup } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [username, bindUsername, resetUsername] = useFormInput("");
  const [password, bindPassword, resetPassword] = useFormInput("");

  const handleLogin = (e) => {
    e.preventDefault();

    login({ username, password });

    resetUsername();
    resetPassword();
  };

  const handleSignup = (e) => {
    e.preventDefault();

    signup({ user: { username, password } });

    resetUsername();
    resetPassword();
  };

  return (
    <StyledHomePage>
      <h1>{isLogin ? "Login" : "Signup"}</h1>

      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <input type="text" placeholder="username" {...bindUsername} />
        <input type="password" placeholder="password" {...bindPassword} />
        <input type="submit" value={isLogin ? "Login" : "Signup"} />
      </form>

      <p onClick={() => setIsLogin((prevLogin) => !prevLogin)}>
        {isLogin
          ? "Don't have an account yet? Click here to sign up!"
          : "Already have an account? Click here to log in!"}
      </p>
    </StyledHomePage>
  );
};

const StyledHomePage = styled.div``;

HomePage.propTypes = {};

export default HomePage;
