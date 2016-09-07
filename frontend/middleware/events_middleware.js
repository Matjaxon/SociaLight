import * as EventsAPI from '../util/events_api_util';
import * as EventActions from '../actions/event_actions';
import { hashHistory } from 'react-router';

const EventsMiddleware = ({ getState, dispatch }) => next => action => {
  const eventsSuccess = data => dispatch(EventActions.receiveEvents(data));
  const eventSuccess = data => dispatch(EventActions.receiveEvent(data));
  const eventUpdateSuccess = data => {
    hashHistory.push(`event/${data.id}`);
    dispatch(EventActions.receiveEvent(data));
  };
  const eventDeleteSuccess = () => hashHistory.push('/');
  const toggleBookmarkSuccess = data =>
    dispatch(EventActions.receiveBookmarkEvent(data));

  switch(action.type) {
    case EventActions.EventConstants.REQUEST_EVENTS:
      EventsAPI.fetchEvents(eventsSuccess);
      return next(action);

    case EventActions.EventConstants.REQUEST_EVENT:
      EventsAPI.fetchEvent(action.eventId, eventSuccess);
      return next(action);

    case EventActions.EventConstants.CREATE_EVENT:
      EventsAPI.createEvent(action.eventData, eventUpdateSuccess);
      return next(action);

    case EventActions.EventConstants.UPDATE_EVENT:
      EventsAPI.updateEvent(action.eventId, action.eventData,
        eventUpdateSuccess);
      return next(action);

    case EventActions.EventConstants.DELETE_EVENT:
      EventsAPI.deleteEvent(action.eventData.id, eventDeleteSuccess);
      return next(action);

    case EventActions.EventConstants.TOGGLE_BOOKMARK:
      EventsAPI.toggleBookmark(action.eventId, toggleBookmarkSuccess);
      return next(action);

    default:
      return next(action);
  }
};

export default EventsMiddleware;
