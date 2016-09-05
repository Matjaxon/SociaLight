import React from 'react';
import { Link, withRouter } from 'react-router';
import TicketFormContainer from '../ticket_form/ticket_form_container';

class EventShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestEvent(this.props.eventId);
  }

  render() {
    const showEvent = (this.props.eventDetail);
    const defaultHeaderImage = 'http://res.cloudinary.com/dbwkodu79/image/upload/c_scale,g_center,h_500,y_0/v1472759821/sparklers_vdmfph.jpg';
    if (showEvent) {
      let startDateTime = new Date(showEvent.start_time);
      let endDateTime = new Date(showEvent.end_time);
      let editButton;
      debugger;
      if (this.props.currentUser &&
        this.props.currentUser.id === showEvent.organizer_id) {
        editButton = <Link to={`/edit-event/${showEvent.id}`}
          className="form-button show-edit-button">Edit Event</Link>;
      } else {
        editButton = "";
      }

      let headerLocation;
      let detailLocation;
      if (showEvent.venue) {
        headerLocation = showEvent.venue.name;
        detailLocation = (
          <div>
            <p>{showEvent.venue.name}</p>
            <p>{showEvent.venue.display_address}</p>
          </div>
        );
      } else {
        headerLocation = (showEvent.address) ? showEvent.address: "";
        if (showEvent.address) {
          detailLocation = <p>{`${showEvent.address}, ${showEvent.city},
            ${showEvent.state}`}</p>;
        } else {
          detailLocation = <p>{`${showEvent.city}, ${showEvent.state}`}</p>;
        }
      }

      let showBackgroundImage = (showEvent.main_event_image_url) ?
        showEvent.main_event_image_url : defaultHeaderImage;

      const headerStyle = {
        backgroundImage: `url(${showBackgroundImage})`
      };

      return (
        <section className="event-show-container">
          <section className="show-header" style={headerStyle}>

            <div className="show-header-text">
              <h1 className="show-event-title">{showEvent.title}</h1>
              <h2>{headerLocation}</h2>
              <h2>{startDateTime.toDateString()}</h2>
              <h2>{startDateTime.toLocaleTimeString(navigator.language,
                {hour: '2-digit', minute: '2-digit'})}</h2>
            </div>

            <div className="show-header-footer">
              <Link to="/">{(showEvent.ticket_price === 0) ? "FREE" :
                `Price: $` + showEvent.ticket_price}</Link>
              <Link to={`/event/${showEvent.id}/order`}
                className="buy-tickets">Buy Tickets</Link>
              <Link to="/">Bookmark</Link>
            </div>

            {editButton}
          </section>

          <section className="event-show-body">
            <section className="event-details-container">

              <h3>What</h3>
              <div className="event-details-description">
                <div dangerouslySetInnerHTML=
                  {{__html: showEvent.description_html}} />
              </div>

              <h3>Where</h3>
              <div>{detailLocation}</div>

              <h3>When</h3>
              <h4>Starts</h4>
              <p>{startDateTime.toDateString()}  -
                {startDateTime.toLocaleTimeString(navigator.language,
                {hour: '2-digit', minute: '2-digit'})}</p>

              <h4>Ends</h4>
              <p>{endDateTime.toDateString()} -
                {endDateTime.toLocaleTimeString(navigator.language,
                  {hour: '2-digit', minute: '2-digit'})}</p>
            </section>
            <section className="event-order-container">
              <TicketFormContainer />
            </section>
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

export default withRouter(EventShow);
