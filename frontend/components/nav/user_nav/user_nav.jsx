import React from 'react';
import { Link } from 'react-router';

const UserNav = ({ currentUser, logout }) => {
  if (currentUser) {
    return (
      <div className="user-nav">
        <ul className="user-links">
          <li>
            <Link to="/profile">{currentUser.username}</Link>
          </li>
          <li><button onClick={logout}
            className="logout-button">Logout</button></li>
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
