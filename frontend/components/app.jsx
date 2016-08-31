import React from 'react';
import UserNavContainer from './nav/user_nav/user_nav_container';

const App = ({ children }) => (
  <div>
    <ul className="nav">
      <li className="nav-group nav-logo">
        <h1 className="site-logo">SociaLight</h1>
      </li>
      <li className="nav-group"><UserNavContainer /></li>
    </ul>
    { children }
  </div>
);

export default App;
