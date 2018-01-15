import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser } from '../../actions/authAction';

// NOTE: The side navigation is shown only on large screens,
// it is replaced by top navigation on medium screens and below.

@connect(store => ({
  isAdmin: (store.user.user.role === 'admin'),
  isSuperAdmin: (store.user.user.role === 'superAdmin'),
}))
/**
 * The side navigation that is shown after a user is authenticated.
 * This component is stateful so that it can be able to dispatch the logout action.
 * And also, to be able to differentiate between the type of users;
 */
export default class UserSideNav extends React.Component {

  /**
   * It simply wipes the user info from the store.
   */
  logout = () => {
    this.props.dispatch(clearUser());
  };

  render() {
    return (
      <div className="col-lg-2 fixed-top  d-none d-lg-block" id="side-navigation">
        <div className="mt-5 text-center">
          <p className="lead text-white pt-3 text-capitalize" id="userName">{this.props.userName}</p>
        </div>
        <div className="pt-3 navigation-links">
          <div className="list-group">
            <Link to='/events' className="list-group-item">
              <i className="fa fa-user-circle fa-fw" aria-hidden="true" />&nbsp; My Events
            </Link>
            <Link to="addEvent" className="list-group-item">
              <i className="fa fa-plus fa-fw" aria-hidden="true" />&nbsp; Add Events
            </Link>
            <Link to="/centers2" className="list-group-item">
              <i className="fa fa-bank fa-fw" aria-hidden="true" />&nbsp; Centers
            </Link>
            <AdminOptions isAdmin={this.props.isAdmin} isSuperAdmin={this.props.isSuperAdmin} />
            <Link to="/" className="list-group-item" onClick={this.logout}>
              <i className="fa fa-power-off fa-fw" aria-hidden="true" />&nbsp; Logout
            </Link>
          </div>
        </div>
      </div >
    );
  }
}

// The extra option that is displayed when an admin is logged in
const AdminOptions = (props) => {
  let component;
  if (props.isAdmin || props.isSuperAdmin) {
    component = (
      <div>
        <Link to="/addCenter" className="list-group-item">
          <i className="fa fa-plus fa-fw" aria-hidden="true" />&nbsp; Add Center
        </Link>
        {
          props.isSuperAdmin ?
            <Link to="/addAdmin" className="list-group-item">
              <i className="fa fa-user fa-fw" aria-hidden="true" />&nbsp; Add Admin
          </Link> : null
        }
        <Link to="/transactions" className="list-group-item">
          <i className="fa fa-tasks fa-fw" aria-hidden="true" />&nbsp; Transactions
        </Link>
      </div>
    );
  } else {
    component = null;
  }
  return component;
};
