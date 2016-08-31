import * as EventActions from "../actions/event_actions";
import merge from "lodash/merge";

const defaultState = Object.freeze({
  eventsList: [],
  eventDetail: null
});

const EventsReducer = (state = defaultState, action) => {
  switch (action.type) {

    case EventActions.EventConstants.RECEIVE_EVENTS:
      const newEvents = action.events;
      return merge({}, state, {eventsList: action.events});

    case EventActions.EventConstants.RECEIVE_EVENT:
      const newEvent = action.singleEvent;
      return merge({}, state, {eventDetail: newEvent});

    default:
      return state;
  }
};

export default EventsReducer;
