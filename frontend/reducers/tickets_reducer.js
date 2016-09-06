import * as TicketActions from '../actions/ticket_actions.js';
import merge from 'lodash/merge';

const defaultState = {
  tickets: {},
  activeTicket: {},
  ticketFormOpen: false
};

const TicketsReducer = (state = {}, action) => {
  switch (action.type) {
    case TicketActions.TicketConstants.RECEIVE_TICKET:
      const newTicket = action.ticket;
      const newState = merge({}, state);
      newState.tickets = newTicket;
      newState.activeTicket = newTicket;
      return newState;

    case TicketActions.TicketConstants.TOGGLE_FORM:
      const newState1 = merge({}, state);
      newState1.ticketFormOpen = !state.ticketFormOpen;
      return newState1;

    default:
      return state;
  }
};

export default TicketsReducer;
