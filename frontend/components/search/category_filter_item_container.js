import { connect } from 'react-redux';
import CategoryFilterItem from './category_filter_item';
import * as SearchActions from '../../actions/search_actions';

const mapStateToProps = state => ({
  allFilters: state.search.allFilters
});

const mapDispatchToProps = dispatch => ({
  fetchFilteredEvents: (filters) => dispatch(SearchActions.fetchFilteredEvents(filters)),
  toggleCategoryFilter: (category) => dispatch(SearchActions.toggleCategoryFilter(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryFilterItem);
