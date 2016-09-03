import * as TicketActions from '../actions/ticket_actions.js';
import merge from 'lodash/merge';

const defaultState = {
  tickets: {},
  activeTicket: {}
};

const TicketsReducer = (state = {}, action) => {
  switch (action.type) {
    case TicketActions.TicketConstants.RECEIVE_TICKET:
      const newTicket = action.ticket;
      return merge({}, state, {tickets: newTicket, activeTicket: newTicket});

    default:
      return state;
  }
};

export default TicketsReducer;
