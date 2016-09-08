import React from 'react';
import { withRouter } from 'react-router';

class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
    this._orderNow = this._orderNow.bind(this);
    this._openForm = this._openForm.bind(this);
    this._checkLoggedIn = this._checkLoggedIn.bind(this);
    this.state = {
      numTickets: 1,
      formOpen: this.props.formOpen,
      formIssue: "",
      formSuccess: ""
    };
  }

  _handleChange(key) {
    return (event) => this.setState({[key]: event.target.value, formSuccess: ""});
  }

  componentDidMount() {
    this._checkLoggedIn(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._checkLoggedIn(nextProps);
  }

  _checkLoggedIn(props) {
    if(!props.currentUser) {
      this.setState({formIssue: "You must be logged in to complete order"});
    }
  }

  _openForm(event) {
    if (event) event.preventDefault();
    this.props.toggleForm();
  }

  _orderNow(event) {
    event.preventDefault();
    if (this.props.currentUser && this.props.eventDetail.live) {
      this.props.createTicket(this.props.eventId, this.state.numTickets);
      this.setState({formSuccess: "Ticket order placed"});
    }
  }

  render() {
    let formOpen = this.props.ticketFormOpen;
    let buttonStatus = (this.props.currentUser &&
      this.props.eventDetail.live) ? "" : " submit-disabled";

    return(
      <section className={"ticket-form-container"
        + ((formOpen) ? " ticket-active" : "")}>
        <div className="ticket-nav"
          onClick={() => this._openForm()}>
          <div className="ticket-nav-box">
            <i className="fa fa-play" aria-hidden="true"></i>
          </div>
          <div className="ticket-nav-text">
            Buy Tickets
          </div>
        </div>
        <form className="main-ticket-form" onSubmit={this._orderNow}>
          <h2>Get Your Tickets</h2>
          <div className="form-issue">
            {this.state.formIssue}
          </div>
          <label>
            <h4>Ticket Quantity</h4>
            <input className="event-form-input tickets-input"
              type="number"
              min="1"
              value={this.state.numTickets}
              onChange={this._handleChange('numTickets')}
            />
          </label>
          <div className="price-container">
            <h4>Price Per Ticket</h4>
            <h4>${this.props.ticketPrice}</h4>
          </div>
          <div className="total-price">
            <h3>TOTAL</h3>
            <h3>${this.props.ticketPrice * this.state.numTickets}</h3>
          </div>
          <div className="button-container">
            <input className={"form-button order-now" + buttonStatus}
              type="submit" value="Order Now" />
          </div>
          <div className="form-success">
            {this.state.formSuccess}
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(TicketForm);
