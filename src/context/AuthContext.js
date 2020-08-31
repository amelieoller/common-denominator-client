import React, { useEffect } from "react";

import authReducer from "../reducers/authReducer";
import { API_ROOT, headers } from "../api";

const url = `${API_ROOT}/auth`;
const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const initialState = null;
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthProvider, AuthContext };
