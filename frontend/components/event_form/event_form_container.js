import { connect } from 'react-redux';
import EventForm from './event_form';
import * as EventActions from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => {
  let formType = ownProps.location.pathname.slice(1);
  let preloadedEvent = (formType === 'new-event') ?
    null : state.events.eventDetail;
  return {
    currentUser: state.session.currentUser,
    formType,
    preloadedEvent
  };
};

const mapDispatchToProps = dispatch => ({
  createEvent: (eventData) => dispatch(EventActions.createEvent(eventData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
