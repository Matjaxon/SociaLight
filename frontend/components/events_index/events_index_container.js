import { connect } from 'react-redux';

import EventsIndex from './events_index';
import * as EventActions from '../../actions/event_actions';
import { requestUser } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  if (state.session.currentUser) {
    return ({
      eventsList: state.events.eventsList,
      currentUser: state.session.currentUser,
      savedEvents: state.session.currentUser.saved_events
    });
  } else {
    return ({
      eventsList: state.events.eventsList
    });
  }
};

const mapDispatchToProps = (dispatch) => ({
  requestEvents: () => dispatch(EventActions.requestEvents()),
  toggleBookmark: (eventId) => dispatch(EventActions.toggleBookmark(eventId)),
  requestUser: (userId) => dispatch(requestUser(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndex);
