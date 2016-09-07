import React from 'react';
import HostedEventItem from './hosted_event_item';

const HostedEventsIndex = ({ hostedEvents, currentUser, toggleBookmark }) => {
  if (!hostedEvents) {
    return (<div>...loading</div>);
  } else {
    const hostedEventItems = hostedEvents.map( hostedEvent => {
      let isBookmarked = (currentUser && currentUser.bookmarked_event_ids[hostedEvent.id]) ? true : false;
      let userTickets = (currentUser && currentUser.ticket_counts[hostedEvent.id]) ?
        currentUser.ticket_counts[hostedEvent.id] : 0;
        return(
          <HostedEventItem key={`hosted-${hostedEvent.id}`}
            eventItem={hostedEvent}
            currentUser={currentUser}
            toggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            userTickets={userTickets} />
        );
      }
    );
    return(
      <section className="profile-events-index">
        {hostedEventItems}
      </section>
    );
  }
};

export default HostedEventsIndex;
