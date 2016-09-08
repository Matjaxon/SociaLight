import { connect } from "react-redux";
import Splash from './splash';
import { requestUser } from '../../actions/session_actions';
import { toggleBookmark } from '../../actions/event_actions';

const mapStateToProps = state => {
  if (state.session.currentUser) {
    return ({
      eventsList: state.events.eventsList,
      currentUser: state.session.currentUser,
      savedEvents: state.session.currentUser.saved_events
    });
  } else {
    return ({
      eventsList: state.events.eventsList
    });
  }
};

const mapDispatchToProps = dispatch => ({
  requestUser: (userId) => dispatch(requestUser(userId)),
  toggleBookmark: (eventId) => dispatch(toggleBookmark(eventId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
