export const SearchConstants = {
  FETCH_CATEGORIES: "FETCH_CATEGORIES",
  RECEIVE_CATEGORIES: "RECEIVE_CATEGORIES"
};

export const fetchCategories = () => ({
  type: SearchConstants.FETCH_CATEGORIES
});

export const receiveCategories = (categories) => ({
  type: SearchConstants.RECEIVE_CATEGORIES,
  categories
});
