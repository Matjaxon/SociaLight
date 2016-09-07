import * as SessionActions from '../actions/session_actions';
import * as EventActions from '../actions/event_actions';
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

    case EventActions.EventConstants.RECEIVE_BOOKMARK_EVENT:
      let newState = merge({}, state);
      let bookmarkedEventIds = newState.currentUser.bookmarked_event_ids;
      let eventId = action.eventData.id.toString();
      if (bookmarkedEventIds[eventId]) {
        delete bookmarkedEventIds[eventId];
        let savedEvents = newState.currentUser.saved_events;
        let index = savedEvents.map( savedEvent => savedEvent.id.toString())
          .indexOf(eventId);
        let newSavedEvents = savedEvents.slice(0, index)
          .concat(savedEvents.slice(index + 1));
        newState.currentUser.saved_events = newSavedEvents;
      } else {
        newState.currentUser.bookmarked_event_ids[parseInt(eventId)] = Number(eventId);
        newState.currentUser.saved_events.push(action.eventData);
      }
      return newState;

    default:
      return state;
  }
};

export default SessionReducer;
