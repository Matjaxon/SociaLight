import React from 'react';

const EventIndexItem = ({ eventItem }) => {
  return (
    <ul className="event-index-item">
      <li className='event-index-header'>
        <div className="events-index-image">
          <img className="event-index-image" src="https://hd.unsplash.com/photo-1454908027598-28c44b1716c1" />
        </div>
        <ul className="event-main-details">
          <li className="event-index-time">{eventItem.start_time}</li>
          <li className='event-index-title'>{eventItem.title}</li>
          <li className='event-index-description'>{eventItem.description}</li>
          <li className='event-index-location'>LOCATION</li>
        </ul>
      </li>
      <ul className="event-index-footer">
        <li className='event-index-price'>{eventItem.ticket_price}</li>
        <li className='event-index-category'>Category</li>
        <li className="event-index-bookmark">Bookmark</li>
      </ul>
    </ul>
  );
};

export default EventIndexItem;
