import React from "react";

import { CategoriesContext } from "../context/CategoriesContext";
import { fetchPostCategory, fetchDeleteCategory } from "../api/category";

const useCategories = () => {
  const context = React.useContext(CategoriesContext);

  if (!context) {
    throw new Error(`useCategories must be used within a CategoriesProvider`);
  }

  const [categories, dispatch] = context;

  const addCategory = (category) => {
    fetchPostCategory(category).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "ADD_CATEGORY", category: data });
      }
    });
  };

  const deleteCategory = (categoryId) => {
    fetchDeleteCategory(categoryId).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "DELETE_CATEGORY", categoryId });
      }
    });
  };

  const updateCategory = (category) =>
    dispatch({ type: "UPDATE_CATEGORY", category });

  return {
    categories,
    dispatch,
    addCategory,
    deleteCategory,
    updateCategory,
  };
};

export default useCategories;
