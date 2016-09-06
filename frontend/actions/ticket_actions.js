export const TicketConstants = {
  CREATE_TICKET: "CREATE_TICKET",
  RECEIVE_TICKET: "RECEIVE_TICKET",
  TOGGLE_FORM: "TOGGLE_FORM"
};

export const createTicket = (eventId, numTickets) => ({
  type: TicketConstants.CREATE_TICKET,
  eventId,
  numTickets
});

export const receiveTicket = (ticket) => ({
  type: TicketConstants.RECEIVE_TICKET,
  ticket
});

export const toggleForm = () => ({
  type: TicketConstants.TOGGLE_FORM
});
