import React from 'react';
import SplashEventItemContainer from './splash_event_item_container';

const SplashEventsIndex = ({ eventsList }) => {
  let splashEvents = eventsList.slice(0, 6).map( eventItem => (
      <SplashEventItemContainer key={`splah-event-${eventItem.id}`}
      eventItem={eventItem} />
  ));
  return (
    <section className="splash-events-container">
      {splashEvents}
    </section>
  );
};

export default SplashEventsIndex;
