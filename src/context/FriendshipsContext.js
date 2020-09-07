import React from "react";

import friendshipsReducer from "../reducers/friendshipsReducer";

const FriendshipsContext = React.createContext();

const FriendshipsProvider = (props) => {
  const initialState = [];
  const [state, dispatch] = React.useReducer(friendshipsReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  return <FriendshipsContext.Provider value={value} {...props} />;
};

export { FriendshipsProvider, FriendshipsContext };
