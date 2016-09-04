import { connect } from 'react-redux';

import EventsIndex from './events_index';
import * as EventActions from '../../actions/event_actions';

const mapStateToProps = (state) => ({
  eventsList: state.events.eventsList,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  requestEvents: () => dispatch(EventActions.requestEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsIndex);
