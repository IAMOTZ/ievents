import React from 'react';
import { Link } from 'react-router-dom';

// This is the side navigation that appears when a user is logged in(Large Screen)
const UserSideNav = (props) => {
  return (
    <div class="col-lg-2 fixed-top  d-none d-lg-block" id="navigation-section">
      <div class="mt-5 text-center">
        <p class="lead text-white pt-3" id="userName">{props.userName}</p>
      </div>
      <div class="pt-3 navigation-links">
        <div class="list-group">
          <Link to='/events' class="list-group-item">
            <i class="fa fa-user-circle fa-fw" aria-hidden="true"></i>&nbsp; My Events</Link>
          <a class="list-group-item">
            <i class="fa fa-plus fa-fw" aria-hidden="true"></i>&nbsp; Add Events</a>
          <a class="list-group-item">
            <i class="fa fa-bank fa-fw" aria-hidden="true"></i>&nbsp; Centers</a>
          <a class="list-group-item">
            <i class="fa fa-power-off fa-fw" aria-hidden="true"></i>&nbsp; Logout</a>
        </div>
      </div>
    </div>
  );
};

// This is the side navigation that appears when an admin is logged in(Large Screen)
const AdminSideNav = (props) => {
  return (
    <div class="col-lg-2 fixed-top  d-none d-lg-block" id="navigation-section">
      <div class="profile-pic mt-5 text-center">
        <p class="lead text-white pt-3" id="userName">Admin</p>
      </div>
      <div class="pt-3 navigation-links">
        <div class="list-group">
          <a class="list-group-item">
            <i class="fa fa-bank fa-fw" aria-hidden="true"></i>&nbsp; Centers</a>
          <a class="list-group-item">
            <i class="fa fa-plus fa-fw" aria-hidden="true"></i>&nbsp; Add Center</a>
          <a class="list-group-item">
            <i class="fa fa-tasks fa-fw" aria-hidden="true"></i>&nbsp; Transactions</a>
          <a class="list-group-item">
            <i class="fa fa-power-off fa-fw" aria-hidden="true"></i>&nbsp; Logout</a>
        </div>
      </div>
    </div>
  );
};

export { UserSideNav, AdminSideNav };
