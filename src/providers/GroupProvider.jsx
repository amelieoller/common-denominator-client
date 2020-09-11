import React, { createContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { firestore } from "../firebase";
import { collectIdsAndData } from "../utils";

export const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    let unsubscribeFromGroups = null;

    unsubscribeFromGroups = firestore
      .collection("groups")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        const groups = snapshot.docs.map(collectIdsAndData);

        setGroups(groups);
      });

    return () => {
      unsubscribeFromGroups && unsubscribeFromGroups();
    };
  }, []);

  return (
    <GroupContext.Provider
      value={{
        groups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default withRouter(GroupProvider);
