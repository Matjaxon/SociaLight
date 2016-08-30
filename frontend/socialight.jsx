import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Root from './components/root';

// WINDOW TESTING IMPORTS
import * as SessionAPI from './util/session_api_util';
import * as SessionActions from './actions/session_actions';

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
  window.SessionAPI = SessionAPI;
  window.SessionActions = SessionActions;
  window.logout = () => window.Store.dispatch(SessionActions.logout());
  window.login = (user) => window.Store.dispatch(SessionActions.login(user));
  window.matt = {user: {username: "matt", password: "password"}};

  ReactDOM.render(<Root store={store} />, root);
});
