const categoriesReducer = (categories, action) => {
  switch (action.type) {
    case "CLEAR_STORAGE": {
      // debugger;
      return null;
    }

    // Categories
    case "SET_CATEGORIES": {
      return action.categories;
    }
    case "ADD_CATEGORY": {
      return [...categories, action.category];
    }
    case "DELETE_CATEGORY": {
      return categories.filter((c) => c.id !== action.categoryId);
    }
    case "UPDATE_CATEGORY": {
      return categories.map((c) =>
        c.id === action.category.id ? action.category : c
      );
    }

    // Items
    case "ADD_ITEM": {
      return categories.map((c) => {
        if (c.id === action.item.categoryId) {
          return { ...c, items: [...c.items, action.item] };
        } else {
          return c;
        }
      });
    }
    case "DELETE_ITEM": {
      return categories.map((c) => {
        if (c.id === action.item.categoryId) {
          return {
            ...c,
            items: c.items.filter((i) => i.id !== action.item.id),
          };
        } else {
          return c;
        }
      });
    }
    case "UPDATE_ITEM": {
      return categories.map((c) => {
        if (c.id === action.item.categoryId) {
          return {
            ...c,
            items: c.items.map((i) =>
              i.id === action.item.id ? action.item : i
            ),
          };
        } else {
          return c;
        }
      });
    }
    case "UPDATE_ITEM_RATING": {
      return categories.map((c) => {
        if (c.id === action.item.categoryId) {
          return {
            ...c,
            items: c.items.map((i) =>
              i.id === action.item.id
                ? {
                    ...i,
                    currentUserRating: action.rating,
                  }
                : i
            ),
          };
        } else {
          return c;
        }
      });
    }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export default categoriesReducer;
