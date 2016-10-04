import React from 'react';
import UserNavContainer from './nav/user_nav/user_nav_container';
import { Link } from 'react-router';

const App = ({ children }) => (
  <div>
    <ul className="nav">
      <li className="nav-group nav-logo">
        <Link className="site-logo" to='/'></Link>
      </li>
      <li className="nav-group nav-browse">
        <Link to="/browse">Browse Events</Link>
      </li>
      <li className="nav-group">
        <UserNavContainer />
      </li>
    </ul>
    { children }

    <section className="app-footer">
      <div className="app-footer-links">
        <a href="https://github.com/Matjaxon/SociaLight">
          <i className="fa fa-github fa-4x" aria-hidden="true"></i>
        </a>
        <a href="https://www.linkedin.com/in/mattrjackson1">
          <i className="fa fa-linkedin-square fa-4x" aria-hidden="true"></i>
        </a>
      </div>
    </section>

  </div>
);

export default App;
