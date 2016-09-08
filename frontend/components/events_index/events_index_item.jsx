import React from 'react';
import { withRouter } from 'react-router';

class EventIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: this._checkIsBookmarked(props),
      currentUser: this.props.currentUser
    };
    this._toggleBookmark = this._toggleBookmark.bind(this);
    this._checkIsBookmarked = this._checkIsBookmarked.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isBookmarked: this._checkIsBookmarked(nextProps),
      currentUser: nextProps.currentUser
    });
  }

  _checkIsBookmarked(props) {
    if (this.props.currentUser) {
      return (props.bookmarkedEventIds[this.props.eventItem.id]) ? true : false;
    } else {
      return false;
    }
  }

  _toggleBookmark() {
    if (this.props.currentUser) {
      this.props.toggleBookmark(this.props.eventItem.id);
      this.setState({isBookmarked: !this.state.isBookmarked});
    }
  }

  _handleClick (router, url) {
    return () => router.push(url);
  }

  render() {

    let eventItem = this.props.eventItem;
    let currentUser = this.props.currentUser;
    let toggleBookmark = this.props.toggleBookmark;
    let router = this.props.router;

    let startDateTime = new Date(eventItem.start_time);
    let endDateTime = new Date(eventItem.end_time);

    let liveStatus = (eventItem.live) ? "live" : "draft";

    let eventStatusSection;
    if (!currentUser) {
      eventStatusSection = <div></div>;
    } else if (eventItem.current_user_event) {
      eventStatusSection = <div className={"event-index-status"}>
          <div className={"event-status-text hosted-" + liveStatus}>
            {liveStatus}
          </div>
        </div>;
    } else if (this.props.userTickets > 0) {
      eventStatusSection = <div className="event-index-status has-tickets">
        <div className="tickets-number">{this.props.userTickets}</div>
        <div className="tickets-label">
          {`ticket` + ((this.props.userTickets > 1) ? "s" : "")}
        </div>
      </div>;
    } else {
      eventStatusSection = <div></div>;
    }

    let eventTime = <h5>{`${startDateTime.toDateString()}` + `  ` +
      `${startDateTime.toLocaleTimeString(navigator.language,
      {hour: '2-digit', minute: '2-digit'})}`}</h5>;

    let location;
    if (eventItem.venue) {
      location = eventItem.venue.name;
    } else {
      location = (eventItem.address) ? eventItem.address: "";
    }

    let bookmarkFlag;
    let isBookmarked = this.state.isBookmarked;
    if (isBookmarked) {
      bookmarkFlag = <i className="fa fa-bookmark bookmarked"
        aria-hidden="true"></i>;
    } else {
      bookmarkFlag = <i className="fa fa-bookmark-o" aria-hidden="true"></i>;
    }

    let ticketPrice;
    if (eventItem.ticket_price > 0) {
      ticketPrice = `$${eventItem.ticket_price}`;
    } else {
      ticketPrice = "FREE";
    }

    const defaultItemImage = 'http://res.cloudinary.com/dbwkodu79/image/upload/c_scale,g_center,h_500,y_0/v1472759821/sparklers_vdmfph.jpg';
    let itemBackgroundImage = (eventItem.main_event_image_url) ?
      eventItem.main_event_image_url : defaultItemImage;

    const indexItemStyle = {
      backgroundImage: `url(${itemBackgroundImage})`
    };

    return (
      <ul className="event-index-item">
        <li className='event-index-header'
          onClick={this._handleClick(router, `/event/${eventItem.id}`)}>
          <div className="events-index-image"
            style={indexItemStyle} >
          </div>

          <ul className="event-main-details">
            <li className='event-index-title'><h4>{eventItem.title}</h4></li>
            <li className="event-index-time">
              {eventTime}
            </li>
            <li className='event-index-location'>{location}</li>
          </ul>

          {eventStatusSection}
        </li>

        <ul className="event-index-footer">
          <li className='event-index-price'
            onClick={this._handleClick(router, `/event/${eventItem.id}`)}>
            {ticketPrice}
          </li>
          <li className="event-index-category">{eventItem.category_name}</li>
          <li className="event-index-bookmark"
            onClick={ () => this._toggleBookmark(eventItem.id)}>
            {bookmarkFlag}
          </li>
        </ul>
      </ul>
    );
  }
}

export default withRouter(EventIndexItem);
