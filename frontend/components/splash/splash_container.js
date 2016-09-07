import { connect } from "react-redux";
import Splash from './splash';
import { requestUser } from '../../actions/session_actions';

const mapStateToProps = state => {
  return ({
    eventsList: state.events.eventsList,
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = dispatch => ({
  requestUser: (userId) => dispatch(requestUser(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
