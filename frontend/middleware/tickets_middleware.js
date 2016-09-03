import * as TicketActions from '../actions/ticket_actions';
import * as TicketAPI from '../util/tickets_api_util.js';
import { hashHistory } from 'react-router';

const TicketsMiddleware = ({state, dispatch}) => next => action => {
  const ticketCreateSuccess = (ticket) =>
    dispatch(TicketActions.receiveTicket(ticket));

  switch (action.type) {
    case TicketActions.TicketConstants.CREATE_TICKET:
      TicketAPI.createTicket(action.eventId, action.numTickets,
        ticketCreateSuccess);
      return next(action);

    default:
      return next(action);
  }
};

export default TicketsMiddleware;
