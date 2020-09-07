import React from "react";

import { FriendshipsContext } from "../context/FriendshipsContext";
import {
  fetchPostFriendship,
  fetchDeleteFriendship,
  fetchGetFriendship,
} from "../api/friendship";

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

  const addCategoryToFriendship = (customFriendshipId, newCategory) =>
    dispatch({
      type: "ADD_CATEGORY_TO_FRIENDSHIP",
      customFriendshipId,
      newCategory,
    });

  const removeCategoryFromFriendship = (customFriendshipId, categoryId) =>
    dispatch({
      type: "REMOVE_CATEGORY_FROM_FRIENDSHIP",
      customFriendshipId,
      categoryId,
    });

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
  };
};

export default useFriendships;
