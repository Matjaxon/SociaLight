export const createEvent = (data, success, error) => {
  debugger;
  $.ajax({
    method: "POST",
    url: "api/events",
    data,
    success,
    error
  });
};

export const fetchEvents = (success, error) => {
  $.ajax({
    method: "GET",
    url: "api/events",
    success,
    error
  });
};

export const fetchEvent = (eventId, success, error) => {
  $.ajax({
    method: "GET",
    url: `api/events/${eventId}`,
    success,
    error
  });
};
