export const login = user => {
  return {
    type: 'LOGIN',
    user,
    completed: false,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
    completed: false,
  };
};
