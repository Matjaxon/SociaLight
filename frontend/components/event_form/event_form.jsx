import React from 'react';
import { DateRange } from 'react-date-range';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';
import UploadButton from './upload_button';
import LocationForm from './location_form';
import EventFormMap from './event_form_map';

const newEventState = {
  title: "",
  description: "",
  category_id: "",
  num_tickets: 100,
  ticket_price: 0,
  start_time: setupDate(),
  end_time: setupDate(),
  live: false,
  address: "",
  city: "",
  state: "",
  main_event_image_url: null,
  venue: null,
  venue_id: null,
  venue_name: "",
  venue_displayLocation: "",
  venue_latitude: "",
  venue_longitude: ""
};

function setupDate() {
  let date = new Date();
  date.setHours(12);
  date.setMinutes(0);
  return date;
}

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
    this._createCategoryOptions = this._createCategoryOptions.bind(this);
    this._postImage = this._postImage.bind(this);
    this._setLocation = this._setLocation.bind(this);
  }

  componentWillMount() {
    if (this.props.formType !== 'new-event' &&
      this.props.preloadedEvent === null) {
      this.props.requestEvent(this.props.activeEventId);
    }
    this.props.fetchCategories();
  }

  componentDidUpdate() {
    if (!this.props.currentUser) {
      this.props.router.push('/login');
    }
    if (this.props.preloadedEvent) {
      this._checkOwner();
    }
  }

  _createCategoryOptions(categories) {
    return categories.map( category => (
      <option key={`category-${category.id}`}
        value={category.id}>{category.name}</option>
    ));
  }

  componentWillReceiveProps(nextProps) {
    let that = this;
    if (nextProps.formType === "new-event") {
      that.setState(newEventState);
    } else {
      if (!nextProps.preloadedEvent) {
        that.setState(newEventState);
      } else {
        let tempState = {};
        let stateKeys = Object.keys(newEventState);
        let preloadedEvent = nextProps.preloadedEvent;
        stateKeys.forEach( key => {
          tempState[`${key}`] = preloadedEvent[`${key}`];
        });
        if (preloadedEvent.venue) {
          let venue = preloadedEvent.venue;
          tempState.venue_id = venue.id;
          tempState.venue_name = venue.name;
          tempState.venue_displayLocation = venue.display_address;
          tempState.venue_latitude = venue.latitude;
          tempState.venue_longitude = venue.longitude;
        }
        tempState.start_time = new Date(tempState.start_time);
        tempState.end_time = new Date(tempState.end_time);
        that.setState(tempState);
      }
    }
    this.categoryOptions = this._createCategoryOptions(nextProps.categories);
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

  _setLocation(args) {
    this.setState(args);
  }

  _handleStartTimeChange(event) {
    event.stopPropagation();
    event.preventDefault();
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
    event.stopPropagation();
    event.preventDefault();
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
    event.stopPropagation();
    event.preventDefault();
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
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    let stagedEvent = {'event': {
      title: this.state.title,
      description: this.state.description,
      category_id: this.state.category_id,
      num_tickets: this.state.num_tickets,
      ticket_price: this.state.ticket_price,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      live: this.state.live,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      main_event_image_url: this.state.main_event_image_url,
      venue_id: this.state.venue_id
    }};

    let stagedVenue = {'venue': {
      name: this.state.venue_name,
      latitude: this.state.venue_latitude,
      longitude: this.state.venue_longitude,
      display_address: this.state.venue_displayLocation
    }};

    if (this.props.formType === 'new-event') {
      if (!stagedEvent.venue_id) {
        this.props.createVenueAndEvent(stagedVenue, stagedEvent);
      } else {
        this.props.createEvent(stagedEvent);
      }

    } else {
      let eventId = parseInt(this.props.activeEventId);
      if (!stagedEvent.venue_id) {
        this.props.createVenueAndUpdateEvent(stagedVenue, eventId, stagedEvent);
      } else {
        this.props.updateEvent(eventId, stagedEvent);
      }
    }
  }

  _toggleLive(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({live: !this.state.live}, () => this._handleSubmit());
  }

  _deleteEvent(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.props.formType === "new-event") {
      this.setState(newEventState);
    } else {
      this.props.deleteEvent(this.props.preloadedEvent);
    }
  }

  _postImage(image) {
    this.setState({main_event_image_url: image.url});
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

    const deleteButtonText = (this.props.formType === "new-event") ?
      "Discard" : "Delete";

    let imageBox;
    if (this.state.main_event_image_url) {
      let eventImageStyle = {
        backgroundImage: `url(${this.state.main_event_image_url})`
      };
      imageBox = (
        <div>
          <div style={eventImageStyle} className='event-image-box-active'></div>
          <UploadButton status="image-uploaded" postImage={this._postImage} />
        </div>
      );
    } else {
      imageBox = (
        <div className="event-image-box-default">
          <div className="event-image-default-inner"
            id="inner-image-box">
            <UploadButton status="no-image" postImage={this._postImage} />
          </div>
        </div>
      );
    }

    if (this.props.categories) {
      this._createCategoryOptions(this.props.categories);
    }

    let displayStartTime = `${this.state.start_time.toDateString()}
        ${this.state.start_time.toLocaleTimeString(navigator.language,
        {hour: '2-digit', minute: '2-digit'})}`;

    let displayEndTime = `${this.state.end_time.toDateString()}
        ${this.state.end_time.toLocaleTimeString(navigator.language,
        {hour: '2-digit', minute: '2-digit'})}`;

    let displayTime = <span>{`${displayStartTime} - ${displayEndTime}`}</span>;

    return(
      <section className="event-form-container">
        <h1 className="event-form-title">{formTitle}</h1>
        <form className="event-form" onSubmit={this._handleSubmit}>

          <h2>Event Details</h2>
          <h4 className={"event-status " +
            ((isLive) ? "live-event" : "draft-event")}>
              Event Status: {(isLive) ? 'live' : 'draft'}
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

            <label className="event-form-input">
              <h3>Event Category</h3>
              <select
                className="event-category-selector"
                value={this.state.category_id}
                onChange={this._handleChange("category_id")}>
                <option value="" disabled>Select Category</option>
                {this.categoryOptions}
              </select>
            </label>

            <div className="calendar-container">
              <label className="event-form-input"></label>
              <h3>Event Time</h3>
                <div className="event-time-display">
                  {displayTime}
                </div>
                <div>
                  <DateRange
                    onInit={this._handleSelect}
                    onChange={this._handleSelect}
                    calendars={1}
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

            <label className="event-form-input middle-length">
              <h3>Venue Name <span className="label-note"> - optional</span></h3>
              <input
                type="text"
                className="event-form-input"
                value={this.state.name}
                onChange={this._handleChange("venue_name")}
              />
            </label>

            <LocationForm
                displayLocation={this.state.venue_displayLocation}
                setLocation={this._setLocation}
              />

            <EventFormMap
              latitude={this.state.venue_latitude}
              longitude={this.state.venue_longitude}
            />

            <label className="event-form-input">
              <h3>Banner Image <span className="label-note"> - optional</span></h3>
              <div className="image-upload-container">
                {imageBox}
              </div>
            </label>

            <h2>Tickets</h2>
            <label className="event-form-input">
              <h3>Total Tickets</h3>
              <input
                className="event-form-input tickets-input"
                type="number"
                min={1}
                step={1}
                value={this.state.num_tickets}
                onChange={this._handleChange("num_tickets")} />
            </label>

            <label className="event-form-input">
              <h3>Price Per Ticket ($)</h3>
              <input
                className="event-form-input tickets-input"
                type="number"
                min={0}
                step={1}
                value={this.state.ticket_price}
                onChange={this._handleChange("ticket_price")} />
            </label>
          </div>

          <h2>Take It Live</h2>

          <h4 className={"event-status " +
            ((isLive) ? "live-event" : "draft-event")}>
              Event Status: {(isLive) ? 'live' : 'draft'}
          </h4>

          <div className="button-container">

            <input type="submit" className="save-button form-button"
              value={`Save Changes`} />

            {launchButton}

            <div className="save-button form-button delete-button"
              onClick={this._deleteEvent}>{deleteButtonText} Event</div>

          </div>

        </form>
      </section>
    );
  }
}

export default withRouter(EventForm);
