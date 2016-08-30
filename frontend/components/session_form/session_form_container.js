import { connect } from 'react-redux';

import * as SessionActions from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => {
  let loggedIn = state.session.currentUser !== null;
  return {
    loggedIn: loggedIn,
    errors: state.session.errors,
    formType: "login"
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.location.pathname.slice(1);
  const processForm = (formType === 'login') ? SessionActions.login : SessionActions.signup;

  return {
    processForm: (user) => dispatch(processForm(user)),
    formType
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
