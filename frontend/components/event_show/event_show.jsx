import React from 'react';
import { Link } from 'react-router';

class EventShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestEvent(this.props.eventId);
  }

  componentWillReceiveProps() {
    this.props.requestEvent(this.props.eventId);
  }

  render() {
    const showEvent = (this.props.eventDetail);
    if (showEvent) {
      let startDateTime = new Date(showEvent.start_time);
      let endDateTime = new Date(showEvent.end_time);

      return (
        <section className="event-show-container">
          <div className="show-header">
            <div className="show-header-text">
              <h1 className="show-event-title">{showEvent.title}</h1>
              <h2>{startDateTime.toDateString()}</h2>
              <h2>{startDateTime.toLocaleTimeString(navigator.language,
                {hour: '2-digit', minute: '2-digit'})}</h2>
            </div>
            <div className="show-header-footer">
              <Link to="/">{(showEvent.ticket_price === 0) ? "FREE" :
                `Price: $` + showEvent.ticket_price}</Link>
              <Link to="/" className="buy-tickets">Buy Tickets</Link>
              <Link to="/">Bookmark</Link>
            </div>
          </div>

          <section className="event-details-container">

            <p className="event-details-description">{showEvent.description}</p>

            <h3>Location</h3>
            <p>TO COMPILE LOCATION DETAILS</p>

            <h3>Starts</h3>
            <p>{startDateTime.toDateString()}  -
              {startDateTime.toLocaleTimeString(navigator.language,
              {hour: '2-digit', minute: '2-digit'})}</p>

            <h3>Ends</h3>
            <p>{endDateTime.toDateString()} -
              {endDateTime.toLocaleTimeString(navigator.language,
                {hour: '2-digit', minute: '2-digit'})}</p>
          </section>

        </section>
      );
    } else {
      return (
        <section className="event-show-container">Loading...</section>
      );
    }
  }
}

export default EventShow;
