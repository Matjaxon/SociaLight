export const createEvent = (data, success, error) => {
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

export const fetchEvent = (eventData, success, error) => {
  $.ajax({
    method: "GET",
    url: `api/events/${eventData.id}`,
    success,
    error
  });
};
