export const fetchCategories = (success, error) => {
  $.ajax({
    method: "GET",
    url: "api/categories",
    success,
    error
  });
};

export const fetchFilteredEvents = (filters, success, error) => {
  $.ajax({
    method: "GET",
    url: "api/events",
    data : {filters: filters},
    success,
    error
  });
};
