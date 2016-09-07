import React from 'react';
import EventIndexItemContainer from '../events_index/events_index_item_container';
import { withRouter } from 'react-router';


const HostedEventItem = ({ eventItem, currentUser, toggleBookmark }) => (
  <div className="hosted-event-item-container">
    <div className="event-index-item">
      <EventIndexItemContainer eventItem={eventItem}
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
