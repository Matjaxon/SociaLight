import React from 'react';
import EventIndexItemContainer from './events_index_item_container';

class EventsIndex extends React.Component {
  componentWillMount() {
    if (this.props.currentUser) {
      this.props.requestUser(this.props.currentUser.id);
    }
  }

  render() {
    let eventListItems = this.props.eventsList.map( singleEvent => {
      let currentUser = this.props.currentUser;
      let isBookmarked = (currentUser && currentUser.bookmarked_event_ids[singleEvent.id]) ? true : false;
      let userTickets = (currentUser && currentUser.ticket_counts[singleEvent.id]) ?
        currentUser.ticket_counts[singleEvent.id] : 0;
      return(
        <EventIndexItemContainer key=
            {`event-index-item-${singleEvent.id}`}
            eventItem={singleEvent}
            isBookmarked={isBookmarked}
            userTickets={userTickets}
            displayType={"browse"}
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
