import React from "react";

import { FriendshipsContext } from "../context/FriendshipsContext";
import {
  fetchPostFriendship,
  fetchDeleteFriendship,
  fetchGetFriendship,
  fetchPatchFriendship,
} from "../api/friendship";
import {
  fetchDeleteItem,
  fetchPostItem,
  fetchPatchItemRating,
  fetchPatchItem,
} from "../api/item";
import { fetchPostCategory } from "../api/category";

const useFriendships = () => {
  const context = React.useContext(FriendshipsContext);
  if (!context) {
    throw new Error(`useFriendships must be used within a FriendshipsProvider`);
  }

  const [friendships, dispatch] = context;

  const clearStorage = () => {
    dispatch({ type: "CLEAR_STORAGE" });
  };

  // Friendships
  const getFriendships = (token) => {
    // fetchGetFriendships(token).then((data) => {
    //   if (data.errors) {
    //     console.log(data.errors);
    //   } else {
    //     dispatch({ type: "SET_FRIENDSHIPS", friendships: data });
    //   }
    // });
  };

  const getFriendship = (friendId) => {
    fetchGetFriendship(friendId).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "SET_FRIENDSHIP", friendship: data });
      }
    });
  };

  const addFriendship = (friendship) => {
    fetchPostFriendship(friendship).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "ADD_FRIENDSHIP", friendship: data });
      }
    });
  };

  const deleteFriendship = (friendshipId) => {
    fetchDeleteFriendship(friendshipId).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({ type: "DELETE_FRIENDSHIP", friendshipId });
      }
    });
  };

  const addCategoryToFriendship = (customFriendshipId, newCategory) => {
    return fetchPostCategory(newCategory).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({
          type: "ADD_CATEGORY_TO_FRIENDSHIP",
          customFriendshipId,
          newCategory: data,
        });
        return data;
      }
    });
  };

  const addCategoryItemToFriendship = (friendshipId, newItem, categoryId) => {
    fetchPostItem(categoryId, newItem).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({
          type: "ADD_CATEGORY_ITEM_TO_FRIENDSHIP",
          friendshipId,
          newItem: data,
          categoryId,
        });
      }
    });
  };

  const removeCategoryItemFromFriendship = (
    friendshipId,
    itemId,
    categoryId
  ) => {
    fetchDeleteItem({ categoryId: categoryId, id: itemId }).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({
          type: "REMOVE_CATEGORY_ITEM_FROM_FRIENDSHIP",
          friendshipId,
          itemId,
          categoryId,
        });
      }
    });
  };

  const updateCategoryItem = (friendshipId, categoryId, item) => {
    fetchPatchItem(item).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({
          type: "UPDATE_CATEGORY_ITEM",
          friendshipId,
          categoryId,
          newItem: data,
        });
      }
    });
  };

  const updateCategoryItemRating = (
    friendshipId,
    categoryId,
    itemId,
    newRating
  ) => {
    fetchPatchItemRating(newRating).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({
          type: "UPDATE_CATEGORY_ITEM_RATING",
          friendshipId,
          categoryId,
          itemId,
          newRating,
        });
      }
    });
  };

  const removeCategoryFromFriendship = (friendshipId, categoryId) =>
    dispatch({
      type: "REMOVE_CATEGORY_FROM_FRIENDSHIP",
      friendshipId,
      categoryId,
    });

  const updateFriendship = (friendshipId, settings) => {
    fetchPatchFriendship(friendshipId, settings).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        dispatch({
          type: "UPDATE_FRIENDSHIP_SETTINGS",
          friendshipId,
          harmony: data.harmony,
          randomness: data.randomness,
          vetoes: data.vetoes,
        });
      }
    });
  };

  return {
    friendships,
    dispatch,
    addFriendship,
    deleteFriendship,
    addCategoryToFriendship,
    removeCategoryFromFriendship,
    getFriendships,
    clearStorage,
    getFriendship,
    updateFriendship,
    addCategoryItemToFriendship,
    removeCategoryItemFromFriendship,
    updateCategoryItem,
    updateCategoryItemRating,
  };
};

export default useFriendships;
