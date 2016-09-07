import React from 'react';
import EventIndexItem from '../events_index/events_index_item';

const ProfileEventsIndex = ({ eventsList, currentUser, toggleBookmark }) => {
  if (!eventsList) {
    return (<div>...loading</div>);
  } else {
    const eventListItems = eventsList.map( eventItem => {
      let isBookmarked = (currentUser.bookmarked_event_ids[eventItem.id]) ? true : false;
      let userTickets = (currentUser.ticket_counts[eventItem.id]) ?
        currentUser.ticket_counts[eventItem.id] : 0;
      return(
        <EventIndexItem key={`profile-event-${eventItem.id}`}
          eventItem={eventItem}
          currentUser={currentUser}
          toggleBookmark={toggleBookmark}
          isBookmarked={isBookmarked} />
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
