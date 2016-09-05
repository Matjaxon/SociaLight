import React from 'react';
import EventIndexItem from '../events_index/events_index_item';
import { withRouter } from 'react-router';


const HostedEventItem = ({ eventItem, currentUser, toggleBookmark }) => (
  <div className="hosted-event-item-container">
    <div className="event-index-item">
      <EventIndexItem eventItem={eventItem}
        currentUser={currentUser}
        toggleBookmark={toggleBookmark} />
    </div>
    <div className="event-host-details-container">
      Tickets Sold:
      Last Sale:
    </div>
  </div>
);

export default withRouter(HostedEventItem);
