import React from 'react';
import HostedEventItem from './hosted_event_item';

const HostedEventsIndex = ({ hostedEvents }) => {
  if (!hostedEvents) {
    return (<div>...loading</div>);
  } else {
    const hostedEventItems = hostedEvents.map( hostedEvent => (
      <HostedEventItem key={`hosted-${hostedEvent.id}`}
        eventItem={hostedEvent} />
    ));
    return(
      <section className="profile-events-index">
        {hostedEventItems}
      </section>
    );
  }
};

export default HostedEventsIndex;
