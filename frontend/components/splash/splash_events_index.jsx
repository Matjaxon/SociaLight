import React from 'react';
import SplashEventItem from './splash_event_item';

const SplashEventsIndex = ({ eventsList }) => {
  let splashEvents = eventsList.slice(0, 6).map( singleEvent => (
    <SplashEventItem singleEvent={singleEvent} />
  ));
  return (
    <section className="splash-events-container">
      Splash Events Go Here
    </section>
  );
};

export default SplashEventsIndex;
