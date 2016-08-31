export const EventConstants = {
  CREATE_EVENT: "CREATE_EVENT",
  REQUEST_EVENTS: "REQUEST_EVENTS",
  REQUEST_EVENT: "REQUEST_EVENT",
  RECEIVE_EVENTS: "RECEIVE_EVENTS",
  RECEIVE_EVENT: "RECEIVE_EVENT"
};

export const createEvent = (eventData) => ({
  type: EventConstants.CREATE_EVENT,
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
