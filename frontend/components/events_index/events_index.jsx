import React from 'react';
import EventIndexItem from './events_index_item';

class EventsIndex extends React.Component {
  render() {
    let eventListItems = this.props.eventsList.map( singleEvent => (
      <EventIndexItem key=
          {`event-index-item-${singleEvent.id}`} eventItem={singleEvent}
          currentUser={this.props.currentUser}
          toggleBookmark={this.props.toggleBookmark}/>
    ));
    return (
      <section className="event-index-container">
        <div className="event-index">
          <ul>
            {eventListItems}
          </ul>
        </div>
      </section>
    );
  }
}

export default EventsIndex;
