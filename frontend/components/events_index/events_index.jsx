import React from 'react';

class EventsIndex extends React.Component {
  componentDidMount() {
    this.props.requestEvents();
  }

  render() {
    let eventListItems = this.props.eventsList.map( singleEvent => (
      <li>{singleEvent.title}</li>
      )
    );
    return (
      <section>
        Index goes here
        <ul>
          <li>List here?</li>
          {eventListItems}
        </ul>
      </section>
    );
  }
}

export default EventsIndex;
