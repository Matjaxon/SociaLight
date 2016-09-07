import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// WINDOW TESTING IMPORTS
import * as SessionAPI from './util/session_api_util';
import * as SessionActions from './actions/session_actions';
import * as EventActions from './actions/event_actions';
import * as EventsAPI from './util/events_api_util';
import * as TicketActions from './actions/ticket_actions';
import * as TicketsAPI from './util/tickets_api_util';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  let store;

  if (window.currentUser) {
    const preloadedState = {session: {currentUser: window.currentUser}};
    store = window.Store = configureStore(preloadedState);
  } else {
    store = window.Store = configureStore();
  }

  ReactDOM.render(<Root store={store} />, root);
});
