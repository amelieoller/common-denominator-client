import React from "react";

import { CategoriesContext } from "../context/CategoriesContext";
import { fetchPostCategory, fetchDeleteCategory } from "../api/category";
import {
  fetchPostItem,
  fetchDeleteItem,
  fetchPatchItem,
  fetchPatchItemRating,
} from "../api/item";

const useCategories = () => {
  const context = React.useContext(CategoriesContext);

  if (!context) {
    throw new Error(`useCategories must be used within a CategoriesProvider`);
  }

  const [categories, dispatch] = context;

  // Categories
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

  // Items
  const addItem = (categoryId, item) => {
    fetchPostItem(categoryId, item).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "ADD_ITEM", item: data });
      }
    });
  };

  const deleteItem = (item) => {
    fetchDeleteItem(item).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "DELETE_ITEM", item });
      }
    });
  };

  const updateItem = (item) => {
    fetchPatchItem(item).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "UPDATE_ITEM", item });
      }
    });
  };

  const updateItemRating = (item, rating) => {
    fetchPatchItemRating(rating).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "UPDATE_ITEM_RATING", item, rating });
      }
    });
  };

  return {
    categories,
    dispatch,
    addCategory,
    deleteCategory,
    updateCategory,
    addItem,
    deleteItem,
    updateItem,
    updateItemRating,
  };
};

export default useCategories;
