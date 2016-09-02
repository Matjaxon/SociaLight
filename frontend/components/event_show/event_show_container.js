import { connect } from 'react-redux';
import EventShow from './event_show';
import { requestEvent } from '../../actions/event_actions';

const mapStateToProps = (state, ownProps) => {
  let eventId = parseInt(ownProps.params.eventId);
  return {
    eventDetail: state.events.eventDetail,
    eventId,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  requestEvent: (id) => dispatch(requestEvent(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventShow);
