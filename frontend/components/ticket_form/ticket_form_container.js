  import { connect } from 'react-redux';
  import TicketForm from './ticket_form';
  import { createTicket, toggleForm } from '../../actions/ticket_actions';

  const mapStateToProps = (state, ownProps) => ({
    eventId: state.events.eventDetail.id,
    currentUser: state.session.currentUser,
    ticketFormOpen: state.tickets.ticketFormOpen
  });

  const mapDispatchToProps = dispatch => ({
    createTicket: (eventId, numTickets) =>
      dispatch(createTicket(eventId, numTickets)),
    toggleForm: () => dispatch(toggleForm())
  });

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TicketForm);
