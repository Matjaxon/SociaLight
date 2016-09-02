import * as EventsAPI from '../util/events_api_util';
import * as EventActions from '../actions/event_actions';

const EventsMiddleware = ({ getState, dispatch }) => next => action => {
  const eventsSuccess = data => dispatch(EventActions.receiveEvents(data));
  const eventSuccess = data => dispatch(EventActions.receiveEvent(data));

  switch(action.type) {
    case EventActions.EventConstants.REQUEST_EVENTS:
      EventsAPI.fetchEvents(eventsSuccess);
      return next(action);

    case EventActions.EventConstants.REQUEST_EVENT:
      EventsAPI.fetchEvent(action.eventId, eventSuccess);
      return next(action);

    case EventActions.EventConstants.CREATE_EVENT:
      EventsAPI.createEvent(action.eventData, eventSuccess);
      return next(action);

    default:
      return next(action);
  }
};

export default EventsMiddleware;
