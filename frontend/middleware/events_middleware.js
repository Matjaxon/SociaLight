import * as EventsAPI from '../util/events_api_util';
import * as EventActions from '../actions/event_actions';

const EventsMiddleware = ({ getState, dispatch }) => next => action => {
  const eventsSuccess = data => dispatch(EventActions.receiveEvents(data));
  const eventSuccess = data => dispatch(EventActions.receiveEvent(data));

  switch(action.type) {
    case EventActions.EventConstants.REQUEST_EVENTS:
      EventsAPI.fetchEvents(eventsSuccess);
      break;

    case EventActions.EventConstants.REQUEST_EVENT:
      EventsAPI.fetchEvent(action.eventId, eventSuccess);
      break;

    case EventActions.EventConstants.CREATE_EVENT:
      EventsAPI.createEvent(action.eventData, eventSuccess);
      break;

    default:
      break;
  }
  return next(action);
};

export default EventsMiddleware;
