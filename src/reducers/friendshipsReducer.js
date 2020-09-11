const friendshipsReducer = (friendships, action) => {
  switch (action.type) {
    case "CLEAR_STORAGE": {
      return null;
    }

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
        f.id === action.friendshipId
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
              vetoes: action.vetoes,
            }
          : f
      );
    }
    case "ADD_CATEGORY_ITEM_TO_FRIENDSHIP": {
      return friendships.map((f) =>
        f.id === action.friendshipId
          ? {
              ...f,
              categories: f.categories.map((c) =>
                c.id === action.categoryId
                  ? {
                      ...c,
                      items: [...c.items, action.newItem],
                    }
                  : c
              ),
            }
          : f
      );
    }
    case "REMOVE_CATEGORY_ITEM_FROM_FRIENDSHIP": {
      return friendships.map((f) =>
        f.id === action.friendshipId
          ? {
              ...f,
              categories: f.categories.map((c) =>
                c.id === action.categoryId
                  ? {
                      ...c,
                      items: c.items.filter((i) => i.id !== action.itemId),
                    }
                  : c
              ),
            }
          : f
      );
    }
    case "UPDATE_CATEGORY_ITEM": {
      // friendshipId, categoryId, newItem,

      return friendships.map((f) =>
        f.id === action.friendshipId
          ? {
              ...f,
              categories: f.categories.map((c) =>
                c.id === action.categoryId
                  ? {
                      ...c,
                      items: c.items.map((i) =>
                        i.id === action.newItem.id
                          ? { ...i, ...action.newItem }
                          : i
                      ),
                    }
                  : c
              ),
            }
          : f
      );
    }
    case "UPDATE_CATEGORY_ITEM_RATING": {
      // friendshipId, categoryId, itemId, newRating,

      return friendships.map((f) =>
        f.id === action.friendshipId
          ? {
              ...f,
              categories: f.categories.map((c) =>
                c.id === action.categoryId
                  ? {
                      ...c,
                      items: c.items.map((i) =>
                        i.id === action.itemId
                          ? {
                              ...i,
                              currentUserRating: {
                                ...i.currentUserRating,
                                value: action.newRating.value,
                              },
                            }
                          : i
                      ),
                    }
                  : c
              ),
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
