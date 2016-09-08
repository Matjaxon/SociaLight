import React from 'react';
import SplashEventItemContainer from './splash_event_item_container';
import EventIndexItemContainer from '../events_index/events_index_item_container';

const SplashEventsIndex = ({ eventsList }) => {
  let splashEvents = eventsList.slice(0, 6).map( eventItem => (
      <SplashEventItemContainer key={`splash-event-${eventItem.id}`}
      eventItem={eventItem}
      displayType={"splash"} />
  ));
  return (
    <section className="splash-events-container">
      {splashEvents}
    </section>
  );
};

export default SplashEventsIndex;
