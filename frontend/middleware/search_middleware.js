import * as SearchActions from '../actions/search_actions';
import * as SearchAPI from '../util/search_api_util';
import * as EventActions from '../actions/event_actions';

const SearchMiddleware = ({ state, dispatch }) => next => action => {
  const categoriesSuccess = (data) => dispatch(SearchActions.receiveCategories(data));
  const eventsSuccess = data => dispatch(EventActions.receiveEvents(data));
  switch(action.type) {
    case SearchActions.SearchConstants.FETCH_CATEGORIES:
      SearchAPI.fetchCategories(categoriesSuccess);
      return next(action);

    case SearchActions.SearchConstants.FETCH_FILTERED_EVENTS:
      SearchAPI.fetchFilteredEvents(action.filters, eventsSuccess);
      return next(action);

    default:
      return next(action);
  }
};

export default SearchMiddleware;
