import React from 'react';
import EventIndexItem from '../events_index/events_index_item';

const ProfileEventsIndex = ({ eventsList }) => {
  if (!eventsList) {
    return (<div>...loading</div>);
  } else {
    const eventListItems = eventsList.map( eventItem => (
      <EventIndexItem key={`profile-event-${eventItem.id}`}
        eventItem={eventItem} />
    ));
    return(
      <section className="profile-events-index">
        {eventListItems}
      </section>
    );
  }
};

export default ProfileEventsIndex;
