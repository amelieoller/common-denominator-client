import React from "react";

import authReducer from "../reducers/authReducer";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const initialState = null;
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthProvider, AuthContext };
