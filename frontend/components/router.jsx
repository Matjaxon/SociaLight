import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app';
import SessionFormContainer from './session_form/session_form_container';
import Splash from "./splash/splash";
import EventsIndexContainer from './events_index/events_index_container';

const AppRouter = () => (
  <Router history={ hashHistory } >
    <Route path='/' component={ App } >
      <IndexRoute component={ Splash } />
      <Route path="/signup" component={ SessionFormContainer }/>
      <Route path="/login" component={ SessionFormContainer } />
      <Route path="/browse" component={ EventsIndexContainer } />
    </Route>
  </Router>
);

export default AppRouter;
