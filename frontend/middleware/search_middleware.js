import * as SearchActions from '../actions/search_actions';
import * as SearchAPI from '../util/search_api_util';

const SearchMiddleware = ({ state, dispatch }) => next => action => {
  const categoriesSuccess = (data) =>
    dispatch(SearchActions.receiveCategories(data));

  switch(action.type) {
    case SearchActions.SearchConstants.FETCH_CATEGORIES:
      SearchAPI.fetchCategories(categoriesSuccess);
      return next(action);

    default:
      return next(action);
  }
};

export default SearchMiddleware;
