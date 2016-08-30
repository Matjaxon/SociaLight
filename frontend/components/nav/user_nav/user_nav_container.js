import { connect } from 'react-redux';

import * as SessionActions from "../../../actions/session_actions";
import UserNav from './user_nav';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(SessionActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserNav);
