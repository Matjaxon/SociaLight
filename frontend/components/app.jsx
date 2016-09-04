import React from 'react';
import UserNavContainer from './nav/user_nav/user_nav_container';
import { Link } from 'react-router';

const App = ({ children }) => (
  <div>
    <ul className="nav">
      <li className="nav-group nav-logo">
        <Link to='/'><h1 className="site-logo">SociaLight</h1></Link>
      </li>
      <li className="nav-group">
        <Link to="/browse"><h3>Browse Events</h3></Link>
      </li>
      <li className="nav-group"><UserNavContainer /></li>
    </ul>
    { children }

    <section className="app-footer"></section>

  </div>
);

export default App;
