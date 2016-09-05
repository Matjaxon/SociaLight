import React from 'react';
import { withRouter } from 'react-router';
import ClassUtil from '../../util/class_name_util';
// import "../../class_name_util";
// import { addClassName } from '../../util/class_name_util';


class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this._orderNow = this._orderNow.bind(this);
    this._showGroupOrder = this._showGroupOrder.bind(this);
    this._hideGroupOrder = this._hideGroupOrder.bind(this);
    this.state = {numTickets: 1};
  }

  componentDidMount() {
    this._resetForms();
  }


  // Object.prototype.addClassName = function(newClass) {
  //   this.className += ` ${newClass}`;
  // };

  _handleChange(key) {
    return (event) => this.setState({[key]: event.target.value});
  }

  _resetForms() {
    const groupOrderDiv = document.getElementById("group-order");
    if (!Array.from(groupOrderDiv.classList).includes("hidden-form")) {
      groupOrderDiv.classList.add("hidden-form");
    }
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
    // groupOrderDiv.classList.remove("show-form");
    // $('.group-order-form').hide("slide", {direction: "up"}, 1500);
  }

  render() {
    return(
      <section className="ticket-form-container">
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
