export const createVenue = (data, success, error) => {
  $.ajax({
    method: "POST",
    url: "api/venues",
    data,
    success,
    error
  });
};
