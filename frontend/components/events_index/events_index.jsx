import React from 'react';
import EventIndexItem from './events_index_item';

class EventsIndex extends React.Component {
  render() {
    let eventListItems = this.props.eventsList.map( singleEvent => (
      <EventIndexItem key={`event-index-item-${singleEvent.id}`}
        eventItem={singleEvent} />
    ));
    return (
      <section className="event-index">
        <h2>Discover a new experience</h2>
        <ul>
          {eventListItems}
        </ul>
      </section>
    );
  }
}

export default EventsIndex;
