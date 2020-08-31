import React from "react";

import { AuthContext } from "../context/AuthContext";
import { fetchSignup, fetchLogin, fetchGetCurrentUser } from "../api/auth";

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  const [user, dispatch] = context;

  const logUserIn = (data) => {
    localStorage.setItem("token", data.token);

    dispatch({
      type: "SET_USER",
      user: { ...data.user, token: data.token },
    });
  };

  const logUserOut = () => {
    localStorage.removeItem("token");

    dispatch({
      type: "REMOVE_USER",
    });
  };

  const signup = (user) => {
    fetchSignup(user).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        logUserIn(data);
      }
    });
  };

  const login = (user) => {
    fetchLogin(user).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        logUserIn(data);
      }
    });
  };

  const getCurrentUser = () => {
    return fetchGetCurrentUser().then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        logUserIn(data);
      }
    });
  };

  const logout = () => {
    logUserOut();
  };

  return {
    user,
    login,
    getCurrentUser,
    signup,
    logout,
  };
};

export default useAuth;
