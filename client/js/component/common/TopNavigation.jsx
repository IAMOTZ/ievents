import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../../actions/authAction';

// NOTE: The user specific top navigation is shown only on medium screens and below,
// it is replaced by side navigation on large screens.

/**
 * The top navigation that is shown when a user is yet to be authenticated.
 */
const TopNav = () => (
  <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
    <div className="container">
      <Link to="/" className="navbar-brand">
        <strong>Ievents</strong>
      </Link>
      <button className="navbar-toggler" data-toggle="collapse" data-target="#navMenu">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/centers1" className="nav-link">Centers</Link>
          </li>
          <li className="nav-item">
            <Link to="/users/login" className="nav-link"> Signin </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link"> Signup </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

/**
 * The top navigation that is shown when a user is authenticated.
 */
const UserTopNav = props => (
  <nav className="navbar navbar-expand-md navbar-dark fixed-top d-block d-lg-none">
    <div className="container">
      <a href="" className="navbar-brand">
        <strong className="text-capitalize">{props.name}</strong>
        <br />
        <p className="h6">{props.title}</p>
      </a>
      <button className="navbar-toggler" data-toggle="collapse" data-target="#navMenu">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/events" className="nav-link">My events</Link>
          </li>
          <li className="nav-item">
            <Link to="/addEvent" className="nav-link">Add Events</Link>
          </li>
          <li className="nav-item">
            <Link to="/centers2" className="nav-link">Centers</Link>
          </li>
          <AdminOptions isAdmin={props.isAdmin} isSuperAdmin={props.isSuperAdmin} />
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => props.dispatch(logOut())}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

/**
 * The extra options that is displayed when an admin is logged in.
 */
const AdminOptions = (props) => {
  let component;
  if (props.isAdmin || props.isSuperAdmin) {
    component = (
      <span className="d-flex flex-column flex-md-row">
        <li className="nav-item">
          <Link to="/addCenter" className="nav-link">Add Center</Link>
        </li>
        {
          props.isSuperAdmin ?
            <li className="nav-item">
              <Link to="/addAdmin" className="nav-link">Add Admin</Link>
            </li> : null
        }
        <li className="nav-item">
          <Link to="/transactions" className="nav-link">Transactions</Link>
        </li>
      </span>
    );
  } else {
    component = null;
  }
  return component;
};

export default TopNav;
export { UserTopNav, AdminOptions };
