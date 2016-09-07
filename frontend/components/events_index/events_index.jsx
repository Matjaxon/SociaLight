import React from 'react';
import EventIndexItem from './events_index_item';

class EventsIndex extends React.Component {
  render() {
    let eventListItems = this.props.eventsList.map( singleEvent => {
      let currentUser = this.props.currentUser;
      let isBookmarked = (currentUser && currentUser.bookmarked_event_ids[singleEvent.id]) ? true : false;
      let userTickets = (currentUser && currentUser.ticket_counts[singleEvent.id]) ?
        currentUser.ticket_counts[singleEvent.id] : 0;
      return(
        <EventIndexItem key=
            {`event-index-item-${singleEvent.id}`} eventItem={singleEvent}
            currentUser={this.props.currentUser}
            toggleBookmark={this.props.toggleBookmark}
            isBookmarked={isBookmarked}
            userTickets={userTickets}
           />
        );
    });
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
