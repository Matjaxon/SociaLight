import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app';
import SessionFormContainer from './session_form/session_form_container';
import Splash from "./splash/splash";
import EventsIndexContainer from './events_index/events_index_container';
import EventFormContainer from './event_form/event_form_container';
import EventShowContainer from './event_show/event_show_container';


class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this._enforceLogin = this._enforceLogin.bind(this);
    this._redirectIfLoggedIn = this._redirectIfLoggedIn.bind(this);

    this.routes = (
      <Route path='/' component={ App } >
        <IndexRoute component={ Splash } />
        <Route path="/signup" component={ SessionFormContainer }
          onEnter={this._redirectIfLoggedIn} />
        <Route path="/login" component={ SessionFormContainer }
          onEnter={this._redirectIfLoggedIn}/>
        <Route path="/browse" component={ EventsIndexContainer } />
        <Route path="/new-event"
          component={ EventFormContainer }
          onEnter={this._enforceLogin}/>
        <Route path="/event/:id" component={ EventShowContainer } />
      </Route>
    );
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


  render() {
    return (
      <Router history={ hashHistory } routes={this.routes} >
      </Router>
    );
  }
}

export default AppRouter;
