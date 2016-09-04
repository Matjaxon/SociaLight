import React from 'react';
import EventIndexItem from '../events_index/events_index_item';
import { withRouter } from 'react-router';


const HostedEventItem = ({ eventItem }) => (
  <div className="hosted-event-item-container">
    <div className="event-index-item">
      <EventIndexItem eventItem={eventItem} />
    </div>
    <div className="event-host-details-container">
      Tickets Sold:
      Last Sale:
    </div>
  </div>
);

export default withRouter(HostedEventItem);
