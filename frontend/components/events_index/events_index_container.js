import { connect } from 'react-redux';

import EventsIndex from './events_index';
import * as EventActions from '../../actions/event_actions';
import { requestUser } from '../../actions/session_actions';
import { fetchFilteredEvents, updateFilters } from '../../actions/search_actions';

const mapStateToProps = (state) => {
  if (state.session.currentUser) {
    return ({
      eventsList: state.events.eventsList,
      currentUser: state.session.currentUser,
      savedEvents: state.session.currentUser.saved_events,
      allFilters: state.search.allFilters
    });
  } else {
    return ({
      eventsList: state.events.eventsList,
      allFilters: state.search.allFilters
    });
  }
};

const mapDispatchToProps = (dispatch) => ({
  requestEvents: () => dispatch(EventActions.requestEvents()),
  toggleBookmark: (eventId) => dispatch(EventActions.toggleBookmark(eventId)),
  requestUser: (userId) => dispatch(requestUser(userId)),
  fetchFilteredEvents: (filters) => dispatch(fetchFilteredEvents(filters)),
  updateFilters: (filters) => dispatch(updateFilters(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndex);
