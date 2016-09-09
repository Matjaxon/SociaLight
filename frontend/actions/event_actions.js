export const EventConstants = {
  REQUEST_EVENTS: "REQUEST_EVENTS",
  REQUEST_EVENT: "REQUEST_EVENT",
  RECEIVE_EVENTS: "RECEIVE_EVENTS",
  RECEIVE_EVENT: "RECEIVE_EVENT",
  CREATE_EVENT: "CREATE_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
  TOGGLE_BOOKMARK: "TOGGLE_BOOKMARK",
  RECEIVE_BOOKMARK_EVENT: "RECEIVE_BOOKMARK_EVENT",
  CREATE_VENUE_AND_EVENT: "CREATE_VENUE_AND_EVENT",
  CREATE_VENUE_AND_UPDATE_EVENT: "CREATE_VENUE_AND_UPDATE_EVENT",
  RESET_EVENT_FORM: "RESET_EVENT_FORM"
};

export const resetEventForm = () => ({
  type: EventConstants.RESET_EVENT_FORM
});

export const createEvent = (eventData) => ({
  type: EventConstants.CREATE_EVENT,
  eventData
});

export const updateEvent = (eventId, eventData) => ({
  type: EventConstants.UPDATE_EVENT,
  eventId,
  eventData
});

export const receiveEvents = (events) => ({
  type: EventConstants.RECEIVE_EVENTS,
  events
});

export const receiveEvent = (singleEvent) => ({
  type: EventConstants.RECEIVE_EVENT,
  singleEvent
});

export const requestEvents = () => ({
  type: EventConstants.REQUEST_EVENTS
});

export const requestEvent = (eventId) => ({
  type: EventConstants.REQUEST_EVENT,
  eventId
});

export const deleteEvent = (eventData) => ({
  type: EventConstants.DELETE_EVENT,
  eventData
});

export const toggleBookmark = (eventId) => ({
  type: EventConstants.TOGGLE_BOOKMARK,
  eventId
});

export const receiveBookmarkEvent = (eventData) => ({
  type: EventConstants.RECEIVE_BOOKMARK_EVENT,
  eventData
});

export const createVenueAndEvent = (venueData, eventData) => ({
  type: EventConstants.CREATE_VENUE_AND_EVENT,
  venueData,
  eventData
});

export const createVenueAndUpdateEvent = (venueData, eventId, eventData) => ({
  type: EventConstants.CREATE_VENUE_AND_UPDATE_EVENT,
  venueData,
  eventId,
  eventData
});
