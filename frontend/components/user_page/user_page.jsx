import React from 'react';
import HostedEventsIndex from './hosted_events_index';
import ProfileEventsIndex from './profile_events_index';
import { Link, withRouter } from 'react-router';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "events",
      savedEvents: this.props.savedEvents
    };
    this._changeActive = this._changeActive.bind(this);
  }

  componentDidUpdate() {
    if (!this.props.currentUser) {
      this.props.router.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({savedEvents: nextProps.savedEvents});
  }

  _changeActive(key) {
    event.preventDefault();
    this.setState({active: key});
  }

  render() {
    const active = this.state.active;
    return (
      <section className="user-page-container">
        <section className="user-details-container">
          <h2>{this.props.username}</h2>
          <div className="profile-event-button-container">
            <button
              className={"profile-button" +
                ((active === "events") ? " selected-button" : "")}
              onClick={() => this._changeActive("events")}>Purchased Events</button>
            <button
              className={"profile-button" +
                ((active === "hosted") ? " selected-button" : "")}
              onClick={() => this._changeActive("hosted")}>Hosted Events</button>
            <button
              className={"profile-button" +
                ((active === "saved") ? " selected-button" : "")}
              onClick={() => this._changeActive("saved")}>Saved Events</button>
          </div>
        </section>

        <section className="profile-events-container">
          <div className="index-overflow-container">
            <section className={((active === "events") ? "open " : "closed")}>
              <ProfileEventsIndex eventsList={this.props.boughtEvents}
                currentUser={this.props.currentUser}
                toggleBookmark={this.props.toggleBookmark} />
              <Link className="form-button profile-index-button"
                to="/browse">Discover Something New</Link>
            </section>
          </div>

          <div className="index-overflow-container">
            <section className={((active === "hosted") ? "open " : "closed")}>
              <HostedEventsIndex
                hostedEvents={this.props.hostedEvents}
                currentUser={this.props.currentUser}
                toggleBookmark={this.props.toggleBookmark}/>
              <Link className="form-button profile-index-button"
                to="/new-event">Host Something Awesome</Link>
            </section>
          </div>

          <div className="index-overflow-container">
            <section className={((active === "saved") ? "open " : "closed")}>
              <ProfileEventsIndex eventsList={this.state.savedEvents}
                currentUser={this.props.currentUser}
                toggleBookmark={this.props.toggleBookmark}/>
              <Link className="form-button profile-index-button"
                to="/browse">Discover Something New</Link>
            </section>
          </div>

        </section>

      </section>
    );
  }
}

export default withRouter(UserPage);
