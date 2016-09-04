import { connect } from 'react-redux';
import UserPage from "./user_page";

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  username: state.session.currentUser.username,
  boughtEvents: state.session.currentUser.events,
  hostedEvents: state.session.currentUser.hosted_events
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
