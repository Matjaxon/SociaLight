import React from 'react';
import { DateRange } from 'react-date-range';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category_id: 1,
      organizer_id: this.props.currentUser.id,
      num_tickets: 0,
      ticket_price: 0,
      start_time: new Date(),
      end_time: new Date(),
      live: false,
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._handleStartTimeChange = this._handleStartTimeChange.bind(this);
    this._handleEndTimeChange = this._handleEndTimeChange.bind(this);
  }

  _handleChange(key) {
      console.log(this.state);
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

    console.log(range);
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

  render() {
    return(
      <section className="event-form-container">
        <div>New Event Form</div>
        <form className="event-form">
          <div className="event-form-fields">
            <label>
              Event Name:
              <input
                className="event-form-input"
                type="text"
                value={this.state.title}
                onChange={this._handleChange("title")} />
            </label>

            <label>
              Description:
              <input
                className="event-form-input"
                type="text"
                value={this.state.description}
                onChange={this._handleChange("description")} />
            </label>

            <label>
              Total Tickets:
              <input
                className="event-form-input"
                type="number"
                value={this.state.num_tickets}
                onChange={this._handleChange("num_tickets")} />
            </label>

            <label>
              Select Dates:
              <div>
                <DateRange
                  onInit={this._handleSelect}
                  onChange={this._handleSelect}
                />
              </div>
            </label>

            <label>
              Start Time:
              <input
                className="event-form-input"
                type="time"
                value={("0" + this.state.start_time.getHours()).slice(-2)
                  + ":" + ("0" + this.state.start_time.getMinutes()).slice(-2)}
                onChange={this._handleStartTimeChange} />
            </label>

            <label>
              Start Time:
              <input
                className="event-form-input"
                type="time"
                value={("0" + this.state.end_time.getHours()).slice(-2) +
                  ":" + ("0" + this.state.end_time.getMinutes()).slice(-2)}
                onChange={this._handleEndTimeChange} />
            </label>
          </div>

          <input type="submit" value={`Create Event`} />

        </form>
      </section>
    );
  }
}

export default EventForm;
