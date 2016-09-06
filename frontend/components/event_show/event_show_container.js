import { connect } from 'react-redux';
import EventShow from './event_show';
import { requestEvent, toggleBookmark } from '../../actions/event_actions';
import { toggleForm } from '../../actions/ticket_actions';

const mapStateToProps = (state, ownProps) => {
  let eventId = parseInt(ownProps.params.eventId);
  let isBookmarked;
  if (state.events.eventDetail) {
    isBookmarked = state.events.eventDetail.is_bookmarked;
  } else {
    isBookmarked = false;
  }
  return {
    eventDetail: state.events.eventDetail,
    eventId,
    currentUser: state.session.currentUser,
    isBookmarked,
  };
};

const mapDispatchToProps = dispatch => ({
  requestEvent: (id) => dispatch(requestEvent(id)),
  toggleBookmark: (eventId) => dispatch(toggleBookmark(eventId)),
  toggleForm: () => dispatch(toggleForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventShow);
