export const signup = (data, success, error) => {
  $.ajax({
    method: "POST",
    url: "/api/users",
    data,
    success,
    error
  });
};

export const login = (data, success, error) => {
  $.ajax({
    method: "POST",
    url: "/api/session",
    data,
    success,
    error
  });
};

export const logout = (success, error) => {
  $.ajax({
    method: "DELETE",
    url: "/api/session",
    success,
    error
  });
};

export const fetchUser = (userId, success, error) => {
  $.ajax({
    method: "GET",
    url: `/api/users/${userId}`,
    success,
    error
  });
};
