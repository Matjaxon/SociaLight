import React from 'react';
import { Link } from 'react-router';

const UserNav = ({ currentUser, logout }) => {
  if (currentUser) {
    return (
      <div className="user-nav">
        <ul className="user-links">
          <li>
            <Link to="/new-event">Create Event</Link>
          </li>
          <li>
            <Link to="/profile">{currentUser.username}</Link>
          </li>
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="user-nav">
        <ul className="user-links">
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
