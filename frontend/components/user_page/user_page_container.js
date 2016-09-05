import { connect } from 'react-redux';
import UserPage from "./user_page";
import * as EventActions from '../../actions/event_actions';

const mapStateToProps = (state) => {
  if (state.session.currentUser) {
    return {
      currentUser: state.session.currentUser,
      username: state.session.currentUser.username,
      boughtEvents: state.session.currentUser.events,
      hostedEvents: state.session.currentUser.hosted_events,
      savedEvents: state.session.currentUser.saved_events
    };
  } else {
    return {
      currentUser: state.session.currentUser
    };
  }
};

const mapDispatchToProps = dispatch => ({
  toggleBookmark: (eventId) => dispatch(EventActions.toggleBookmark(eventId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
