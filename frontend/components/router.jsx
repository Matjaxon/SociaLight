import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { requestEvent, requestEvents, resetEventForm } from '../actions/event_actions';
import { requestUser } from '../actions/session_actions';
import { fetchFilteredEvents, fetchCategories } from '../actions/search_actions';

import App from './app';
import SessionFormContainer from './session_form/session_form_container';
import Splash from "./splash/splash";
import SplashContainer from './splash/splash_container';
import EventsIndexContainer from './events_index/events_index_container';
import EventFormContainer from './event_form/event_form_container';
import EventShowContainer from './event_show/event_show_container';
import TicketForm from './ticket_form/ticket_form';
import UserPageContainer from './user_page/user_page_container';
import SearchContainer from './search/search_container';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this._enforceLogin = this._enforceLogin.bind(this);
    this._redirectIfLoggedIn = this._redirectIfLoggedIn.bind(this);
    this._requestEvents = this._requestEvents.bind(this);
    this._requestEvent = this._requestEvent.bind(this);
    this._requestProfile = this._requestProfile.bind(this);
    this._loadNewForm = this._loadNewForm.bind(this);
    this._fetchFilteredEvents = this._fetchFilteredEvents.bind(this);
    this._prepSearch = this._prepSearch.bind(this);

    this.routes = (
      <Route path='/' component={ App } >
        <IndexRoute component={ SplashContainer }
          onEnter={this._fetchFilteredEvents({limit: 6})} />
        <Route path="signup" component={ SessionFormContainer }
          onEnter={this._redirectIfLoggedIn} />
        <Route path="login" component={ SessionFormContainer }
          onEnter={this._redirectIfLoggedIn} />
        <Route path="browse" component={ SearchContainer }
          onEnter={this._prepSearch} />
        <Route path="new-event" component={ EventFormContainer }
          onEnter={this._loadNewForm} />
        <Route path="event/:eventId" component={ EventShowContainer }>
          <Route path="order" component={ TicketForm } />
        </Route>
        <Route path="edit-event/:eventId" component={ EventFormContainer }
          onEnter={this._requestEvent} />
        <Route path="profile" component={ UserPageContainer }
          onEnter={this._requestProfile} />
      </Route>
    );
  }

  _requestProfile(_, replace) {
    if (!this.props.currentUser) {
      replace('/login');
    } else {
      this.props.dispatch(requestUser(this.props.currentUser.id));
    }
  }

  _prepSearch() {
    this.props.dispatch(fetchCategories());
    this._fetchFilteredEvents({limit: 50});
  }

  _requestEvents() {
    this.props.dispatch(requestEvents());
  }

  _requestEvent(nextState) {
    this.props.dispatch(requestEvent(parseInt(nextState.params.eventId)));
  }

  _enforceLogin(nextState, replace) {
    if (!this.props.currentUser) {
      replace('/login');
    }
  }

  _redirectIfLoggedIn(nextState, replace) {
    if (this.props.currentUser) {
      replace('/');
    }
  }

  _loadNewForm(nextState, replace) {
    this._enforceLogin(nextState, replace);
    this.props.dispatch(resetEventForm());
  }

  _fetchFilteredEvents(filter) {
    this.props.dispatch(fetchFilteredEvents(filter));
  }

  render() {
    return (
      <Router history={ hashHistory } routes={ this.routes }>
      </Router>
    );
  }
}

export default AppRouter;
