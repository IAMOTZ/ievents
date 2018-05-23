import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';
import AdminLinks from './AdminLinks';
import { logOut } from '../../../actions/authAction';

const SideNavigation = props => (
  <div className="col-lg-2 fixed-top  d-none d-lg-block" id="side-navigation">
    <div className="mt-5 text-center">
      <p className="lead text-white pt-3 text-capitalize" id="name">{props.name}</p>
    </div>
    <div className="pt-3 navigation-links">
      <div className="list-group">
        <Link to="/events" className="list-group-item">
          <i className="fa fa-book fa-fw" aria-hidden="true" />&nbsp; My Events
        </Link>
        <Link to="addEvent" className="list-group-item">
          <i className="fa fa-plus fa-fw" aria-hidden="true" />&nbsp; Create Event
        </Link>
        <Link to="/centers2" className="list-group-item">
          <i className="fa fa-bank fa-fw" aria-hidden="true" />&nbsp; Centers
        </Link>
        <AdminLinks isAdmin={props.isAdmin} isSuperAdmin={props.isSuperAdmin} />
        <Link to="/profile" className="list-group-item">
          <i className="fa fa-user-circle fa-fw" aria-hidden="true" />&nbsp; Profile
        </Link>
        <Link to="/" className="list-group-item" onClick={() => props.dispatch(logOut())}>
          <i className="fa fa-power-off fa-fw" aria-hidden="true" />&nbsp; Logout
        </Link>
      </div>
    </div>
  </div >
);

SideNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default SideNavigation;
