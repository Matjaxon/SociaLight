import * as SearchActions from '../actions/search_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  categories: []
});

const SearchReducer = (state = defaultState, action) => {
  switch(action.type) {
    case SearchActions.SearchConstants.RECEIVE_CATEGORIES:
      return merge({}, state, {categories: action.categories});

    default:
      return state;
  }
};

export default SearchReducer;
