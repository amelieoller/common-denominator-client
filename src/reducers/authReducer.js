const authReducer = (user, action) => {
  switch (action.type) {
    case "SET_USER": {
      return action.user;
    }
    case "REMOVE_USER": {
      return null;
    }
    case "DELETE_USER": {
      return user;
    }
    case "UPDATE_USER": {
      return user;
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export default authReducer;
