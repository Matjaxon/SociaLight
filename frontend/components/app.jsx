import React from 'react';
import UserNavContainer from './nav/user_nav/user_nav_container';

const App = ({ children }) => (
  <div>
    <h1>SociaLight</h1>
    <UserNavContainer />
    { children }
  </div>
);

export default App;
