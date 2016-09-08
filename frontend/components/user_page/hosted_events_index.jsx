import React from 'react';
import HostedEventItem from './hosted_event_item';

const HostedEventsIndex = ({ hostedEvents, currentUser, toggleBookmark,
    isBookmarked, userTickets }) => {
  if (!hostedEvents) {
    return (<div>...loading</div>);
  } else {
    const hostedEventItems = hostedEvents.map( hostedEvent => {
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
