import React from 'react';
import { withRouter } from 'react-router';

const _handleClick = (router, url) => (
  () => router.push(url)
);

const EventIndexItem = ({ eventItem, currentUser, toggleBookmark, router }) => {

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
  let isBookmarked = eventItem.is_bookmarked;
  if (isBookmarked) {
    bookmarkFlag = <i className="fa fa-bookmark bookmarked"
      aria-hidden="true"></i>;
  } else {
    bookmarkFlag = <i className="fa fa-bookmark-o" aria-hidden="true"></i>;
  }

  return (
    <ul className="event-index-item">
      <li className='event-index-header'
        onClick={_handleClick(router, `/event/${eventItem.id}`)}>
        <div className="events-index-image">
          <img className="event-index-image"
            src="https://hd.unsplash.com/photo-1454908027598-28c44b1716c1" />
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
          onClick={ () => toggleBookmark(eventItem.id)}>
          {bookmarkFlag}
        </li>
      </ul>
    </ul>
  );
};

export default withRouter(EventIndexItem);
