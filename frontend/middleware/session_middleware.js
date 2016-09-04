import * as SessionAPI from '../util/session_api_util';
import * as SessionActions from '../actions/session_actions';

const SessionMiddleware = ({store, dispatch}) => next => action => {
  let loginSuccess = (user) => {
    return dispatch(SessionActions.receiveCurrentUser(user));
  };
  let loginFail = (errors) => {
    console.log(errors);
    return dispatch(SessionActions.receiveErrors(errors));
  };

  switch (action.type) {
    case SessionActions.SessionConstants.LOGIN:
      SessionAPI.login(action.user, loginSuccess, loginFail);
      return next(action);

    case SessionActions.SessionConstants.SIGNUP:
      SessionAPI.signup(action.user, loginSuccess, loginFail);
      return next(action);

    case SessionActions.SessionConstants.LOGOUT:
      SessionAPI.logout(next(action), loginFail);
      return next(action);

    case SessionActions.SessionConstants.REQUEST_USER:
      SessionAPI.fetchUser(action.userId, loginSuccess, loginFail);
      return next(action);

    default:
      return next(action);
  }
};

export default SessionMiddleware;
