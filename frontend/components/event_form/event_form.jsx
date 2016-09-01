import React from 'react';
import { DateRange } from 'react-date-range';
import { withRouter } from 'react-router';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category_id: 1,
      num_tickets: 100,
      ticket_price: 0,
      start_time: new Date(),
      end_time: new Date(),
      live: false,
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._handleStartTimeChange = this._handleStartTimeChange.bind(this);
    this._handleEndTimeChange = this._handleEndTimeChange.bind(this);
    this._saveChanges = this._saveChanges.bind(this);
    this._toggleLive = this._toggleLive.bind(this);
  }

  componentDidUpdate() {
    if (!this.props.currentUser) {
      this.props.router.push('/login');
    }
  }

  _handleChange(key) {
      return (event) => this.setState({[key]: event.target.value});
    }

  _handleStartTimeChange(event) {
    if (event.type !== "DOMContentLoaded" && event.type !=="hashchange") {
      let inputTime = (event.target.value) ? event.target.value : "12:00";
      let timeArray = inputTime.split(":");
      let tempTime = this.state.start_time;

      tempTime.setHours(timeArray[0]);
      tempTime.setMinutes(timeArray[1]);
      this.setState({start_time: tempTime});
    }
  }
  _handleEndTimeChange(event) {
    if (event.type !== "DOMContentLoaded" && event.type !=="hashchange") {
      let inputTime = (event.target.value) ? event.target.value : "12:00";
      let timeArray = inputTime.split(":");
      let tempTime = this.state.end_time;

      tempTime.setHours(timeArray[0]);
      tempTime.setMinutes(timeArray[1]);
      this.setState({end_time: tempTime});
    }
  }

  _handleSelect(range) {
    let startDate = new Date(range.startDate._d.getTime());
    let endDate = new Date(range.endDate._d.getTime());

    let startHours, startMinutes, endHours, endMinutes;

    startHours = this.state.start_time.getHours();
    startHours = ("0" + startHours).slice(-2);
    startMinutes = this.state.start_time.getMinutes();
    startMinutes = ("0" + startMinutes).slice(-2);

    endHours = this.state.end_time.getHours();
    endHours = ("0" + endHours).slice(-2);
    endMinutes = this.state.end_time.getMinutes();
    endMinutes = ("0" + endMinutes).slice(-2);

    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);

    endDate.setHours(endHours);
    endDate.setMinutes(endMinutes);

    this.setState({start_time: startDate, end_time: endDate});
  }

  _saveChanges(event) {
    if (event) event.preventDefault();
    this.props.createEvent({'event': this.state});
  }

  _toggleLive(event) {
    event.preventDefault();
    this.setState({live: true}, this._saveChanges);
  }

  render() {

    const isLive = this.state.live;

    let launchButton;
    if (isLive) {
      launchButton = <button className="launch-button hide-event"
        onClick={this._toggleLive}>Hide Event</button>;
    } else {
      launchButton = <button className="launch-button hvr-back-pulse"
        onClick={this._toggleLive}>Launch Event</button>;
    }

    return(
      <section className="event-form-container">
        <h1 className="event-form-title">Create A New Event</h1>
        <form className="event-form" onSubmit={this._saveChanges}>

          <h2>Event Details</h2>
          <h4 className={"event-status " +
            ((isLive) ? "live-event" : "draft-event")}>
              Status: {(isLive) ? 'live' : 'draft'}
          </h4>

          <div className="event-form-fields">
            <label className="event-form-input">
              <h3>Event Name</h3>
              <input
                className="event-form-input-title"
                type="text"
                value={this.state.title}
                onChange={this._handleChange("title")} />
            </label>

            <label className="event-form-input">
              <h3>Description</h3>
              <textarea rows="8"
                className="event-form-input"
                value={this.state.description}
                onChange={this._handleChange("description")} />
            </label>

            <div className="calendar-container">
              <label className="event-form-input"></label>
                <h3>Event Time</h3>
                <div className="event-time-display">
                  {this.state.start_time.toString()} -
                  {this.state.end_time.toString()}
                </div>
                <div>
                  <DateRange
                    onInit={this._handleSelect}
                    onChange={this._handleSelect}
                  />
                </div>
            </div>

            <div className="times-container">
              <label className="event-form-input">
                <h3>Start Time</h3>
                <input
                  className="event-form-input"
                  type="time"
                  value={("0" + this.state.start_time.getHours()).slice(-2)
                    + ":" + ("0" + this.state.start_time.getMinutes()).slice(-2)}
                  onChange={this._handleStartTimeChange} />
              </label>

              <label className="event-form-input">
                <h3>End Time</h3>
                <input
                  className="event-form-input"
                  type="time"
                  value={("0" + this.state.end_time.getHours()).slice(-2) +
                    ":" + ("0" + this.state.end_time.getMinutes()).slice(-2)}
                  onChange={this._handleEndTimeChange} />
              </label>
            </div>

            <h2>Tickets</h2>
            <label className="event-form-input">
              <h3>Total Tickets</h3>
              <input
                className="event-form-input tickets-input"
                type="number"
                value={this.state.num_tickets}
                onChange={this._handleChange("num_tickets")} />
            </label>

            <label className="event-form-input">
              <h3>Price Per Ticket ($)</h3>
              <input
                className="event-form-input tickets-input"
                type="number"
                value={this.state.ticket_price}
                onChange={this._handleChange("ticket_price")} />
            </label>
          </div>

          <h2>Take It Live</h2>

          <h4 className={"event-status " +
            ((isLive) ? "live-event" : "draft-event")}>
              Status: {(isLive) ? 'live' : 'draft'}
          </h4>

          <div className="button-container">

            {launchButton}

            <input type="submit" className="form-button save-button"
              value={`Save Changes`} />
          </div>

        </form>
      </section>
    );
  }
}

export default withRouter(EventForm);
