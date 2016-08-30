import * as SessionActions from '../actions/session_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  currentUser: null,
  errors: []
});

const SessionReducer = (state = defaultState, action) => {
  switch(action.type) {

    case SessionActions.SessionConstants.RECEIVE_CURRENT_USER:
      return {currentUser: action.user, errors: []};

    case SessionActions.SessionConstants.RECEIVE_ERRORS:
      let allErrors = state.errors.concat(action.errors);
      let currentUser = state.currentUser;
      return {currentUser: currentUser, errors: [allErrors]};

    case SessionActions.SessionConstants.LOGOUT:
      return defaultState;

    default:
      return state;
  }
};

export default SessionReducer;
