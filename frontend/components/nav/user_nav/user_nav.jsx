import React from 'react';
import { Link } from 'react-router';

const UserNav = ({ currentUser, logout }) => {
  if (currentUser) {
    return (
      <div>
        <h2>Hello {currentUser.username}</h2>
        <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>
    );
  }
};

export default UserNav;
