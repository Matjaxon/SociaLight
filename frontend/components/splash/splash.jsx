import React from 'react';
import { Link } from 'react-router';
import SplashEventsIndex from './splash_events_index';

class Splash extends React.Component {

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.requestUser(this.props.currentUser.id);
    }
  }

  render() {
    return (
      <section>
        <section className="splash-header">
          <div className="splash-text">
            <h1>Sell Tickets</h1>
            <h4>Create, promote, and manage amazing events</h4>
            <Link className="splash-create-event" to="/new-event">
              Create Event
            </Link>
          </div>
        </section>

        <ul className="featured-cities-container">
          <li>San Francisco</li>
          <li>Los Angeles</li>
          <li>New York</li>
          <li>Chicago</li>
        </ul>

        <SplashEventsIndex
          eventsList={this.props.eventsList}
          currenetUser={this.props.currentUser}
          savedEvents={this.props.savedEvents}
          toggleBookmark={this.props.toggleBookmark}
        />
      </section>
    );
  }
}

export default Splash;
