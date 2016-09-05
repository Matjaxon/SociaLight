import React from 'react';
import EventIndexItem from '../events_index/events_index_item';

const ProfileEventsIndex = ({ eventsList, currentUser, toggleBookmark }) => {
  if (!eventsList) {
    return (<div>...loading</div>);
  } else {
    const eventListItems = eventsList.map( eventItem => (
      <EventIndexItem key={`profile-event-${eventItem.id}`}
        eventItem={eventItem}
        currentUser={currentUser}
        toggleBookmark={toggleBookmark} />
    ));
    return(
      <section className="events-index profile-events-index">
        {eventListItems}
      </section>
    );
  }
};

export default ProfileEventsIndex;
