import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearUser } from '../../actions/authAction';

@connect((store) => {
  return {

  }
})

// This is the side navigation that appears when a user is logged in(Large Screen)
class UserSideNav extends React.Component {
  logout = () => {
    this.props.dispatch(clearUser());
  }
  render() {
    return (
      <div class="col-lg-2 fixed-top  d-none d-lg-block" id="navigation-section">
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
            <Link to="#" class="list-group-item">
              <i class="fa fa-bank fa-fw" aria-hidden="true"></i>&nbsp; Centers
            </Link>
            <Link to="/" class="list-group-itsem" onClick={this.logout}>
              <i class="fa fa-power-off fa-fw" aria-hidden="true"></i>&nbsp; Logout
            </Link>
          </div>
        </div>
      </div >
    );
  }
}

// This is the side navigation that appears when an admin is logged in(Large Screen)
const AdminSideNav = (props) => {
  return (
    <div class="col-lg-2 fixed-top  d-none d-lg-block" id="navigation-section">
      <div class="profile-pic mt-5 text-center">
        <p class="lead text-white pt-3" id="userName">Admin</p>
      </div>
      <div class="pt-3 navigation-links">
        <div class="list-group">
          <Link to="#" class="list-group-item">
            <i class="fa fa-bank fa-fw" aria-hidden="true"></i>&nbsp; Centers
        </Link>
          <Link to="#" class="list-group-item">
            <i class="fa fa-plus fa-fw" aria-hidden="true"></i>&nbsp; Add Center
        </Link>
          <Link to="#" class="list-group-item">
            <i class="fa fa-tasks fa-fw" aria-hidden="true"></i>&nbsp; Transactions
        </Link>
          <Link to="#" class="list-group-item">
            <i class="fa fa-power-off fa-fw" aria-hidden="true"></i>&nbsp; Logout
        </Link>
        </div>
      </div>
    </div>
  );
};

export { UserSideNav, AdminSideNav };
