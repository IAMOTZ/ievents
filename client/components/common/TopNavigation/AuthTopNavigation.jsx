import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';
import AdminLinks from './AdminLinks';
import { logOut } from '../../../actions/authAction';


const AuthTopNavigation = props => (
  <nav className="navbar navbar-expand-md navbar-dark fixed-top d-block d-lg-none" id="auth-top-navbar">
    <div className="container">
      <a href="#" className="navbar-brand">
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
            <Link to="/addEvent" className="nav-link">Create Event</Link>
          </li>
          <li className="nav-item">
            <Link to="/centers2" className="nav-link">Centers</Link>
          </li>
          <AdminLinks isAdmin={props.isAdmin} isSuperAdmin={props.isSuperAdmin} />
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

AuthTopNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default AuthTopNavigation;
