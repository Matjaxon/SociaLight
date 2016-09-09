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
    <section>
      <h2 className="happening-soon">Events Happening Soon</h2>
      <div className="splash-events-container">
        {splashEvents}
      </div>
    </section>
  );
};

export default SplashEventsIndex;
