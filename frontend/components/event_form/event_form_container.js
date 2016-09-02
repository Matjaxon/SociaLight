import { connect } from 'react-redux';
import EventForm from './event_form';
import * as EventActions from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => {
  let activeEventId = parseInt(ownProps.params.eventId);
  let formType = ownProps.location.pathname.slice(1);
  let preloadedEvent = (formType === 'new-event') ?
    null : state.events.eventDetail;
  return {
    currentUser: state.session.currentUser,
    formType,
    preloadedEvent,
    activeEventId
  };
};

const mapDispatchToProps = dispatch => ({
  createEvent: (eventData) => dispatch(EventActions.createEvent(eventData)),
  updateEvent: (eventId, eventData) =>
    dispatch(EventActions.updateEvent(eventId, eventData)),
  requestEvent: (eventId) => dispatch(EventActions.requestEvent(eventId)),
  deleteEvent: (eventData) => dispatch(EventActions.deleteEvent(eventData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
