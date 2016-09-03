  import { connect } from 'react-redux';
  import TicketForm from './ticket_form';
  import { createTicket } from '../../actions/ticket_actions';

  const mapStateToProps = (state, ownProps) => ({
    eventId: state.events.eventDetail.id,
    currentUser: state.session.currentUser
  });

  const mapDispatchToProps = dispatch => ({
    createTicket: (eventId, numTickets) =>
      dispatch(createTicket(eventId, numTickets)),
  });

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TicketForm);
