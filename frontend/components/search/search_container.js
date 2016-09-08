import { connect } from 'react-redux';
import Search from './search';
import * as SearchActions from '../../actions/search_actions';

const mapStateToProps = (state) => {
  return ({
    eventsList: state.events.eventsList,
    currentUser: state.session.currentUser,
    categories: state.search.categories,
    filteredCategories: state.search.filteredCategories,
    allFilters: state.search.allFilters
  });
};

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(SearchActions.fetchCategories()),
  toggleCategoryFilter: (category) => dispatch(SearchActions.toggleCategoryFilter(category)),
  clearFilters: () => dispatch(SearchActions.clearFilters()),
  fetchFilteredEvents: (filters) => dispatch(SearchActions.fetchFilteredEvents(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
