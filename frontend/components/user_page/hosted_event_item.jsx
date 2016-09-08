import React from 'react';
import EventIndexItemContainer from '../events_index/events_index_item_container';
import { withRouter } from 'react-router';


const HostedEventItem = ({ eventItem, currentUser, toggleBookmark,
  isBookmarked, userTickets }) => (
  <div className="hosted-event-item-container">
    <div className="event-index-item">
      <EventIndexItemContainer
        eventItem={eventItem}
        currentUser={currentUser}
        toggleBookmark={toggleBookmark}
        userTickets={userTickets} />
    </div>
    <div className="event-host-details-container">
      Tickets Sold: {eventItem.ticket_details.sold}
      Last Sale: {eventItem.ticket_details.last_sale_at}
    </div>
  </div>
);

export default withRouter(HostedEventItem);
