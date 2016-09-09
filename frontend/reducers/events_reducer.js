import * as EventActions from "../actions/event_actions";
import merge from "lodash/merge";

const defaultState = Object.freeze({
  eventsList: [],
  eventDetail: null
});

const EventsReducer = (state = defaultState, action) => {
  switch (action.type) {

    case EventActions.EventConstants.RECEIVE_EVENTS:
      let newState = merge({}, state);
      newState.eventsList = action.events;
      return newState;

    case EventActions.EventConstants.RECEIVE_EVENT:
      const newEvent = action.singleEvent;
      return merge({}, state, {eventDetail: newEvent});

    case EventActions.EventConstants.RESET_EVENT_FORM:
      let newState1 = merge({}, state);
      newState1.eventDetail = null;
      return newState1;

    case EventActions.EventConstants.DELETE_EVENT:
      let deletedEventIndex = -1;
      for (let i = 0; i < state.eventsList.length; i++) {
        if (state.eventsList[i].id === action.eventData.id) {
          deletedEventIndex = i;
          break;
        }
      }
      let returnValue;
      if (deletedEventIndex >= 0) {
        let newEvents = state.eventsList.slice(0, deletedEventIndex).concat(
          state.eventsList.slice(deletedEventIndex + 1));
        returnValue =  merge({}, {eventsList: newEvents, eventDetail: null});
      }else {
        returnValue = merge({}, state, {eventDetail: null});
      }
      return returnValue;

    default:
      return state;
  }
};

export default EventsReducer;
