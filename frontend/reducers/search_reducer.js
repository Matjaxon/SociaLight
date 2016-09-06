import * as SearchActions from '../actions/search_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  categories: [],
  filteredCategories: []
});

const SearchReducer = (state = defaultState, action) => {
  switch(action.type) {
    case SearchActions.SearchConstants.RECEIVE_CATEGORIES:
      return merge({}, state, {categories: action.categories});

    case SearchActions.SearchConstants.TOGGLE_CATEGORY_FILTER:
      let filteredCategories = state.filteredCategories;
      let category = action.category;
      let newFilter;
      if (filteredCategories.includes(category)) {
        let index = filteredCategories.indexOf(category);
        newFilter = filteredCategories.slice(0, index)
          .concat(filteredCategories.slice(index + 1));
      } else {
        newFilter = filteredCategories.slice(0).concat([category]);
      }
      debugger;
      return merge({}, state, {filteredCategories: newFilter});

    default:
      return state;
  }
};

export default SearchReducer;
