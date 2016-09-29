import React from 'react';
import { withRouter } from 'react-router';

class SplashEventItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: this._checkIsBookmarked(props)
    };
    this._checkIsBookmarked = this._checkIsBookmarked.bind(this);
    this._toggleBookmark = this._toggleBookmark.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isBookmarked: this._checkIsBookmarked(nextProps),
      currentUser: nextProps.currentUser
    });
  }

  _checkIsBookmarked(props) {
    if (props.currentUser) {
      return (props.bookmarkedEventIds[props.eventItem.id]) ? true : false;
    } else {
      return false;
    }
  }

  _toggleBookmark(router) {
    if (this.props.currentUser) {
      this.props.toggleBookmark(this.props.eventItem.id);
      this.setState({isBookmarked: !this.state.isBookmarked});
    } else {
      router.push("login");
    }
  }

  _handleClick(router, url) {
    return () => router.push(url);
  }

  render () {
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
      <div className="splash-item-container">
        <div className="splash-item-image"
          style={indexItemStyle}
          onClick={this._handleClick(router, `/event/${eventItem.id}`)}>
          <div className="splash-item-price">
            {ticketPrice}
          </div>
        </div>
        <ul className="splash-item-details">
          <li className="splash-item-title"
            onClick={this._handleClick(router, `/event/${eventItem.id}`)}>
            {eventItem.title}
          </li>
          <li className="splash-item-time"
            onClick={this._handleClick(router, `/event/${eventItem.id}`)}>
            {eventTime}
          </li>
          <li className="splash-item-location"
            onClick={this._handleClick(router, `/event/${eventItem.id}`)}>
            {location}
          </li>
        </ul>
        <ul className="event-index-footer splash-item-footer">
          <li className='event-index-category splash-item-category'
            onClick={this._handleClick(router, `/event/${eventItem.id}`)}>
              {eventItem.category_name}
          </li>
          <li className="event-index-bookmark"
            onClick={ () => this._toggleBookmark(router)}>
            {bookmarkFlag}
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(SplashEventItem);
