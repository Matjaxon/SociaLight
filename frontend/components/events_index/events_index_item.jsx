import React from 'react';
import { withRouter } from 'react-router';

const _handleClick = (router, url) => (
  () => router.push(url)
);

class EventIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookmarked: this.props.eventItem.is_bookmarked
    };
    this._toggleBookmark = this._toggleBookmark.bind(this);
  }

  _toggleBookmark() {
    this.props.toggleBookmark(this.props.eventItem.id);
    this.setState({isBookmarked: !this.state.isBookmarked});
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
    } else if (eventItem.current_user_tickets > 0) {
      eventStatusSection = <div className="event-index-status has-tickets">
        <div className="tickets-number">{eventItem.current_user_tickets}</div>
        <div className="tickets-label"> tickets</div>
      </div>;
    } else {
      eventStatusSection = <div></div>;
    }

    let bookmarkFlag;
    let isBookmarked = this.state.isBookmarked;
    if (isBookmarked) {
      bookmarkFlag = <i className="fa fa-bookmark bookmarked"
        aria-hidden="true"></i>;
    } else {
      bookmarkFlag = <i className="fa fa-bookmark-o" aria-hidden="true"></i>;
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
          onClick={_handleClick(router, `/event/${eventItem.id}`)}>
          <div className="events-index-image"
            style={indexItemStyle} >
          </div>

          <ul className="event-main-details">
            <li className='event-index-title'><h4>{eventItem.title}</h4></li>
            <li className="event-index-time">
              <h5>{`${startDateTime.toDateString()}` + `  ` +
                `${startDateTime.toLocaleTimeString(navigator.language,
                {hour: '2-digit', minute: '2-digit'})}`}</h5>
            </li>
            <li className='event-index-location'>LOCATION</li>
          </ul>

          {eventStatusSection}
        </li>

        <ul className="event-index-footer">
          <li className='event-index-price'
            onClick={_handleClick(router, `/event/${eventItem.id}`)}>
            {eventItem.ticket_price}
          </li>
          <li className='event-index-category'>Category</li>
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
