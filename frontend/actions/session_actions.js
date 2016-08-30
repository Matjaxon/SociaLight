export const SessionConstants = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP",
  RECEIVE_CURRENT_USER: "RECEIVE_CURRENT_USER",
  RECEIVE_ERRORS: "RECEIVE_ERRORS"
};

export const login = (user) => ({
  type: SessionConstants.LOGIN,
  user
});

export const logout = () => ({
  type: SessionConstants.LOGOUT
});

export const signup = (user) => ({
  type: SessionConstants.SIGNUP,
  user
});

export const receiveCurrentUser = (user) => ({
  type: SessionConstants.RECEIVE_CURRENT_USER,
  user
});

export const receiveErrors = (errors) => ({
  type: SessionConstants.RECEIVE_ERRORS,
  errors
});
