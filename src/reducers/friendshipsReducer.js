const friendshipsReducer = (friendships, action) => {
  switch (action.type) {
    case "CLEAR_STORAGE": {
      return null;
    }

    // Categories
    case "SET_FRIENDSHIPS": {
      return action.friendships;
    }
    case "SET_FRIENDSHIP": {
      return [...friendships, action.friendship];
    }
    case "DELETE_FRIENDSHIP": {
      return friendships.filter((c) => c.id !== action.friendshipId);
    }
    case "ADD_CATEGORY_TO_FRIENDSHIP": {
      return friendships.map((f) =>
        f.customFriendshipId === action.customFriendshipId
          ? { ...f, categories: [...f.categories, action.newCategory] }
          : f
      );
    }
    case "REMOVE_CATEGORY_FROM_FRIENDSHIP": {
      return friendships.map((f) =>
        f.customFriendshipId === action.customFriendshipId
          ? {
              ...f,
              categories: f.categories.filter(
                (c) => c.id !== action.categoryId
              ),
            }
          : f
      );
    }
    case "UPDATE_FRIENDSHIP_SETTINGS": {
      return friendships.map((f) =>
        f.id === action.friendshipId
          ? {
              ...f,
              harmony: action.harmony,
              randomness: action.randomness,
            }
          : f
      );
    }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export default friendshipsReducer;
