import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearUser } from '../../actions/authAction';

@connect((store) => {
  return {
    isAdmin: (store.user.user.role === 'admin') ? true : false,
  }
})

// This is the side navigation that appears when a user is logged in(Large Screen)
export default class UserSideNav extends React.Component {
  logout = () => {
    this.props.dispatch(clearUser());
  }
  render() {
    return (
      <div class="col-lg-2 fixed-top  d-none d-lg-block" id="side-navigation">
        <div class="mt-5 text-center">
          <p class="lead text-white pt-3 text-capitalize" id="userName">{this.props.userName}</p>
        </div>
        <div class="pt-3 navigation-links">
          <div class="list-group">
            <Link to='/events' class="list-group-item">
              <i class="fa fa-user-circle fa-fw" aria-hidden="true"></i>&nbsp; My Events
            </Link>
            <Link to="addEvent" class="list-group-item">
              <i class="fa fa-plus fa-fw" aria-hidden="true"></i>&nbsp; Add Events
            </Link>
            <Link to="/centers2" class="list-group-item">
              <i class="fa fa-bank fa-fw" aria-hidden="true"></i>&nbsp; Centers
            </Link>
            <AdminOptions isAdmin={this.props.isAdmin} />
            <Link to="/" class="list-group-item" onClick={this.logout}>
              <i class="fa fa-power-off fa-fw" aria-hidden="true"></i>&nbsp; Logout
            </Link>
          </div>
        </div>
      </div >
    );
  }
}

// The extra option that is displayed when an admin is logged in
const AdminOptions = (props) => {
  if (props.isAdmin) {
    return (
      <div>
        <Link to="/addCenter" class="list-group-item">
          <i class="fa fa-plus fa-fw" aria-hidden="true"></i>&nbsp; Add Center
        </Link>
        <Link to="/transactions" class="list-group-item">
          <i class="fa fa-tasks fa-fw" aria-hidden="true"></i>&nbsp; Transactions
        </Link>
      </div>
    );
  } else {
    return null;
  }
}

