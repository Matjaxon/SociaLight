import React from 'react';
import UserNavContainer from './nav/user_nav/user_nav_container';
import { Link } from 'react-router';

const App = ({ children }) => (
  <div>
    <ul className="nav">
      <li className="nav-group nav-logo">
        <Link className="site-logo" to='/'>SociaLight</Link>
      </li>
      <li className="nav-group nav-browse">
        <Link to="/browse">Browse Events</Link>
      </li>
      <li className="nav-group"><UserNavContainer /></li>
    </ul>
    { children }

    <section className="app-footer"></section>

  </div>
);

export default App;
