import React from 'react';
import { DateRange } from 'react-date-range';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

const newEventState = {
  title: "",
  description: "",
  category_id: 1,
  num_tickets: 100,
  ticket_price: 0,
  start_time: new Date(),
  end_time: new Date(),
  live: false,
};

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = newEventState;

    this._handleChange = this._handleChange.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._handleStartTimeChange = this._handleStartTimeChange.bind(this);
    this._handleEndTimeChange = this._handleEndTimeChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._toggleLive = this._toggleLive.bind(this);
    this._checkOwner = this._checkOwner.bind(this);
    this._deleteEvent = this._deleteEvent.bind(this);
  }

  componentWillMount() {
    if (this.props.formType !== 'new-event' &&
      this.props.preloadedEvent === null) {
        return this.props.requestEvent(this.props.activeEventId);
    }
  }

  componentDidUpdate() {
    if (!this.props.currentUser) {
      this.props.router.push('/login');
    }
    if (this.props.preloadedEvent) {
      this._checkOwner();
    }
  }

  componentWillReceiveProps() {
    let that = this;
    if (that.props.formType === "new-event") {
      that.setState(newEventState);
    } else {
      if (that.props.preloadedEvent === null) {
        return that.setState(newEventState);
      } else {
        let tempState = {};
        let stateKeys = Object.keys(newEventState);
        let preloadedEvent = that.props.preloadedEvent;
        stateKeys.forEach( key => {
          tempState[`${key}`] = preloadedEvent[`${key}`];
        });
        tempState.start_time = new Date(tempState.start_time);
        tempState.end_time = new Date(tempState.end_time);
        return that.setState(tempState);
      }
    }
  }

  _checkOwner() {
    const preloadedEvent = this.props.preloadedEvent;
    if (!preloadedEvent || preloadedEvent.organizer_id
      !== this.props.currentUser.id) {
      this.props.router.push('/');
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

  _handleSubmit(event) {
    if (event) event.preventDefault();
    if (this.props.formType === 'new-event') {
      this.props.createEvent({'event': this.state});
    } else {
      let eventId = parseInt(this.props.activeEventId);
      this.props.updateEvent(eventId, {'event': this.state});
    }
  }

  _toggleLive(event) {
    event.preventDefault();
    this.setState({live: !this.state.live}, this._handleSubmit);
  }

  _deleteEvent(event) {
    event.preventDefault();
    if (this.props.formType === "new-event") {
      this.setState(newEventState);
    } else {
      this.props.deleteEvent(this.props.preloadedEvent);
    }
  }

  render() {
    let formTitle = (this.props.formType === 'new-event') ?
    "Create a New Event" : "Edit Your Event";

    const isLive = this.state.live;
    let launchButton;
    if (isLive) {
      launchButton = <button className="launch-button hide-event"
        onClick={this._toggleLive}>Hide Event</button>;
    } else {
      launchButton = <button className="launch-button hvr-back-pulse"
        onClick={this._toggleLive}>Launch Event</button>;
    }

    let deleteButtonText = (this.props.formType === "new-event") ?
      "Discard" : "Delete";


    return(
      <section className="event-form-container">
        <h1 className="event-form-title">{formTitle}</h1>
        <form className="event-form" onSubmit={this._handleSubmit}>

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
                    + ":" + ("0" +
                    this.state.start_time.getMinutes()).slice(-2)}
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

            <input type="submit" className="save-button form-button"
              value={`Save Changes`} />

            <button className="form-button delete-button"
              onClick={this._deleteEvent}>{deleteButtonText} Event</button>

          </div>

        </form>
      </section>
    );
  }
}

export default withRouter(EventForm);
