import { connect } from 'react-redux';
import EventForm from './event_form';
import * as EventActions from '../../actions/event_actions';
import * as SearchActions from '../../actions/search_actions';

const mapStateToProps = (state, ownProps) => {
  let activeEventId = parseInt(ownProps.params.eventId);
  let formType = ownProps.location.pathname.slice(1);
  let preloadedEvent = (formType === 'new-event') ?
    null : state.events.eventDetail;
  return {
    currentUser: state.session.currentUser,
    formType,
    preloadedEvent,
    activeEventId,
    categories: state.search.categories
  };
};

const mapDispatchToProps = dispatch => ({
  createEvent: (eventData) => dispatch(EventActions.createEvent(eventData)),
  updateEvent: (eventId, eventData) =>
    dispatch(EventActions.updateEvent(eventId, eventData)),
  requestEvent: (eventId) => dispatch(EventActions.requestEvent(eventId)),
  deleteEvent: (eventData) => dispatch(EventActions.deleteEvent(eventData)),
  fetchCategories: () => dispatch(SearchActions.fetchCategories()),
  createVenueAndEvent: (venueData, eventData) =>
    dispatch(EventActions.createVenueAndEvent(venueData, eventData)),
  createVenueAndUpdateEvent: (venueData, eventId, eventData) =>
    dispatch(EventActions.createVenueAndUpdateEvent(venueData, eventId, eventData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
