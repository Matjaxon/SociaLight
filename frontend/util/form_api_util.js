export const searchLocation = (searchString, success) => {
  let error = (data) => console.log(data);
  let key = window._lookup_key;
  $.ajax ({
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${key}`,
    success,
    error
  });
};
