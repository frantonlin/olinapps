const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      state = action.user;
      return state;
    case 'LOGOUT':
      state = null;
      return state;
    default:
      return state;
  }
};

export default user;
