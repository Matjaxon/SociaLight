export const createTicket = (eventId, numTickets, success, error) => {
  $.ajax({
    method: "POST",
    url: `/api/events/${eventId}/tickets`,
    data: {num_tickets: numTickets},
    success,
    error
  });
};
