const categoriesReducer = (categories, action) => {
  switch (action.type) {
    case "GET_CATEGORIES": {
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
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export default categoriesReducer;
