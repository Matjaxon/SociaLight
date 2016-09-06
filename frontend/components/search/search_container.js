import { connect } from 'react-redux';
import Search from './search';
import * as SearchActions from '../../actions/search_actions';

const mapStateToProps = state => ({
  eventsList: state.events.eventsList,
  currentUser: state.session.currentUser,
  categories: state.search.categories,
  filteredCategories: ['music']
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(SearchActions.fetchCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
