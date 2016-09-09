import * as EventsAPI from '../util/events_api_util';
import * as EventActions from '../actions/event_actions';
import { hashHistory } from 'react-router';
import * as VenuesAPI from '../util/venues_api_util';
import merge from 'lodash/merge';

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

    case EventActions.EventConstants.CREATE_VENUE_AND_EVENT:
      VenuesAPI.createVenue(action.venueData, (data) => {
        let tempData = merge({}, action.eventData);
        tempData.event.venue_id = data.id;
        dispatch(EventActions.createEvent(tempData));
     });
     return next(action);

    case EventActions.EventConstants.CREATE_VENUE_AND_UPDATE_EVENT:
      VenuesAPI.createVenue(action.venueData, (data) => {
        action.eventData.event.venue_id = data.id;
        dispatch(EventActions.updateEvent(action.eventId, action.eventData));
      });
      return next(action);

    default:
      return next(action);
  }
};

export default EventsMiddleware;
