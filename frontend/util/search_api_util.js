export const fetchCategories = (success, error) => {
  $.ajax({
    method: "GET",
    url: "api/categories",
    success,
    error
  });
};
