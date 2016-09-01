import { connect } from 'react-redux';
import EventForm from './event_form';
import * as EventActions from '../../actions/event_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  createEvent: (eventData) => dispatch(EventActions.createEvent(eventData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
