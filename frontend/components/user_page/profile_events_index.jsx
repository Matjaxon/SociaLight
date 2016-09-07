import React from 'react';
import EventIndexItemContainer from '../events_index/events_index_item_container';

const ProfileEventsIndex = ({ eventsList, currentUser, toggleBookmark }) => {
  if (!eventsList) {
    return (<div>...loading</div>);
  } else {
    const eventListItems = eventsList.map( eventItem => {
      let userTickets = (currentUser.ticket_counts[eventItem.id]) ?
        currentUser.ticket_counts[eventItem.id] : 0;
      return(
        <EventIndexItemContainer key={`profile-event-${eventItem.id}`}
          eventItem={eventItem}
          userTickets={userTickets} />
      );
    });
    return(
      <section className="events-index profile-events-index">
        {eventListItems}
      </section>
    );
  }
};

export default ProfileEventsIndex;
