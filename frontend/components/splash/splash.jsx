import React from 'react';
import { Link } from 'react-router';

class Splash extends React.Component {

  render() {
    return (
      <section className="splash-header">
        <div className="splash-text">
          <h1>Sell Tickets</h1>
          <h4>Create, promote, and manage amazing events</h4>
          <Link className="splash-create-event" to="/new-event">
            Create Event
          </Link>
        </div>
      </section>
    );
  }
}

export default Splash;
