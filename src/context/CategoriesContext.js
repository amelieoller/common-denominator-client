import React, { useEffect } from "react";

import categoriesReducer from "../reducers/categoriesReducer";
import { API_ROOT, headers } from "../api";

const url = `${API_ROOT}/categories`;
const CategoriesContext = React.createContext();

const CategoriesProvider = (props) => {
  const initialState = null;
  const [state, dispatch] = React.useReducer(categoriesReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  useEffect(() => {
    console.log("fetching categories");
    const options = { headers: headers() };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((categories) => {
        if (categories.errors) {
          console.log(categories.errors);
        } else {
          dispatch({ type: "GET_CATEGORIES", categories });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return <CategoriesContext.Provider value={value} {...props} />;
};

export { CategoriesProvider, CategoriesContext };
