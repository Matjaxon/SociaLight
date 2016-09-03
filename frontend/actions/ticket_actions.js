export const TicketConstants = {
  CREATE_TICKET: "CREATE_TICKET",
  RECEIVE_TICKET: "RECEIVE_TICKET"
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
