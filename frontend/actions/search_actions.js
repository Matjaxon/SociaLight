export const SearchConstants = {
  FETCH_CATEGORIES: "FETCH_CATEGORIES",
  RECEIVE_CATEGORIES: "RECEIVE_CATEGORIES",
  TOGGLE_CATEGORY_FILTER: "TOGGLE_CATEGORY_FILTER",
  CLEAR_FILTERS: "CLEAR_FILTERS",
  FETCH_FILTERED_EVENTS: "FETCH_FILTERED_EVENTS"
};

export const fetchCategories = () => ({
  type: SearchConstants.FETCH_CATEGORIES
});

export const receiveCategories = (categories) => ({
  type: SearchConstants.RECEIVE_CATEGORIES,
  categories
});

export const toggleCategoryFilter = (category) => ({
  type: SearchConstants.TOGGLE_CATEGORY_FILTER,
  category
});

export const clearFilters = () => ({
  type: SearchConstants.CLEAR_FILTERS
});

export const fetchFilteredEvents = (filters) => ({
  type: SearchConstants.FETCH_FILTERED_EVENTS,
  filters
});
