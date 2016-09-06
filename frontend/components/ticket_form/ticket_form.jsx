import React from 'react';
import { withRouter } from 'react-router';

class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this._orderNow = this._orderNow.bind(this);
    this._showGroupOrder = this._showGroupOrder.bind(this);
    this._hideGroupOrder = this._hideGroupOrder.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._openForm = this._openForm.bind(this);
    this.state = {
      numTickets: 1,
      formOpen: this.props.formOpen
    };
  }

  componentDidMount() {
    this._resetForms();
  }

  _handleChange(key) {
    return (event) => this.setState({[key]: event.target.value});
  }

  _resetForms() {
    const groupOrderDiv = document.getElementById("group-order");
    if (!Array.from(groupOrderDiv.classList).includes("hidden-form")) {
      groupOrderDiv.classList.add("hidden-form");
    }
  }

  _openForm(event) {
    if (event) event.preventDefault();
    console.log("clicked");
    this.props.toggleForm();
    // return this.setState({formOpen: !this.state.formOpen});
  }

  _orderNow(event) {
    event.preventDefault();
    this.props.createTicket(this.props.eventId, this.state.numTickets);
  }

  _showGroupOrder(event) {
    event.preventDefault();
    const groupOrderDiv = document.getElementById("group-order");
    groupOrderDiv.classList.remove("hidden-form");
  }

  _hideGroupOrder(event) {
    event.preventDefault();
    const groupOrderDiv = document.getElementById("group-order");
    groupOrderDiv.classList.add("hidden-form");
  }

  render() {
    let formOpen = this.props.ticketFormOpen;
    return(
      <section className={"ticket-form-container"
        + ((formOpen) ? " ticket-active" : "")}>
        <div className="ticket-nav"
          onClick={() => this._openForm()}>
          <div className="ticket-nav-box">ARROW</div>
        </div>
        <form className="main-ticket-form" onSubmit={this._orderNow}>
          <h2>Get Your Tickets</h2>
          <label>
            <h4>Ticket Quantity</h4>
            <input className="event-form-input tickets-input"
              type="number"
              min="1"
              value={this.state.numTickets}
              onChange={this._handleChange('numTickets')}
            />
          </label>
          <div className="button-container">
            <input className="form-button order-now"
              type="submit" value="Order Now" />

            <button className="form-button"
              onClick={this._showGroupOrder}>
              Do It As a Group</button>
          </div>
        </form>
        <div className="transition-form group-order-form hidden-form"
          id="group-order">
          <p>COMING SOON</p>
          <p>TEST</p>
          <p>TEST</p>
          <p>TEST</p>
          <p>TEST</p>
          <button className="form-button"
            onClick={this._hideGroupOrder}>
            Hide</button>
        </div>
      </section>
    );
  }
}

export default withRouter(TicketForm);
