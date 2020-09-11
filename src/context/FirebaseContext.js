import React from "react";

import firebaseReducer from "../reducers/firebaseReducer";
import authReducer from "../reducers/authReducer";

const FirebaseContext = React.createContext();

const FirebaseProvider = (props) => {
  const initialState = null;
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  return <FirebaseContext.Provider value={value} {...props} />;
};

export { FirebaseProvider, FirebaseContext };
