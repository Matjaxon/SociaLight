import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Root from './components/root';

// WINDOW TESTING IMPORTS
import * as SessionAPI from './util/session_api_util';
import * as SessionActions from './actions/session_actions';
import * as EventActions from './actions/event_actions';
import * as EventsAPI from './util/events_api_util';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  let store;

  if (window.currentUser) {
    const preloadedState = {session: {currentUser: window.currentUser}};
    store = window.Store = configureStore(preloadedState);
  } else {
    store = window.Store = configureStore();
  }


  // WINDOW TESTING
  debugger;
  window.SessionAPI = SessionAPI;
  window.SessionActions = SessionActions;
  window.logout = () => window.Store.dispatch(SessionActions.logout());
  window.login = (user) => window.Store.dispatch(SessionActions.login(user));
  window.matt = {user: {username: "matt", password: "password"}};
  window.EventsAPI = EventsAPI;
  window.EventActions = EventActions;
  window.fetchEvents = () => window.EventsAPI.fetchEvents( (data) => console.log(data));
  window.requestEvents = () => window.Store.dispatch(EventActions.requestEvents());


  ReactDOM.render(<Root store={store} />, root);
});
