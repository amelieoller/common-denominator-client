import React, { useEffect } from "react";

import categoriesReducer from "../reducers/categoriesReducer";

const CategoriesContext = React.createContext();

const CategoriesProvider = (props) => {
  const initialState = null;
  const [state, dispatch] = React.useReducer(categoriesReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  return <CategoriesContext.Provider value={value} {...props} />;
};

export { CategoriesProvider, CategoriesContext };
