import { connect } from 'react-redux';
import EventShow from './event_show';
import { requestEvent, toggleBookmark } from '../../actions/event_actions';
import { toggleForm } from '../../actions/ticket_actions';

const mapStateToProps = (state, ownProps) => {
  let eventId = parseInt(ownProps.params.eventId);
  const currentUser = state.session.currentUser;
  let isBookmarked;
  if (currentUser) {
    isBookmarked = (currentUser.bookmarked_event_ids[eventId]) ? true : false;
  } else {
    isBookmarked = false;
  }
  return {
    eventDetail: state.events.eventDetail,
    eventId,
    currentUser: state.session.currentUser,
    isBookmarked,
    ticketFormOpen: state.tickets.ticketFormOpen
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
