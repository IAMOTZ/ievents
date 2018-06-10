import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const RegularTopNavigation = () => (
  <nav className="navbar navbar-expand-sm navbar-dark fixed-top" id="regular-top-navbar">
    <div className="container">
      <Link to="/" className="navbar-brand">
        <strong>iEvents</strong>
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
            <Link to="/explore/centers" className="nav-link">Centers</Link>
          </li>
          <li className="nav-item">
            <Link to="/users/login" className="nav-link"> Log in </Link>
          </li>
          <li className="nav-item">
            <Link to="/users/signup" className="nav-link"> Sign up </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default RegularTopNavigation;
