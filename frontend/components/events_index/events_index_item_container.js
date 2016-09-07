import { connect } from "react-redux";
import EventIndexItem from './events_index_item';
import * as EventActions from '../../actions/event_actions';

const mapStateToProps = (state) => {
  if (state.session.currentUser) {
    return({
      currentUser: state.session.currentUser,
      savedEvents: state.session.currentUser.saved_events,
      bookmarkedEventIds: state.session.currentUser.bookmarked_event_ids
    });
  } else {
    return ({
    });
  }

};

const mapDispatchToProps = (dispatch) => ({
  toggleBookmark: (eventId) => dispatch(EventActions.toggleBookmark(eventId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventIndexItem);
