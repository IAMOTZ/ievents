import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearUser } from '../../actions/authAction';

// The navigation that is returned by default
export default () => {
  return (
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
}

@connect((store) => {
  return {
    isAdmin: (store.user.user.role === 'admin') ? true : false,
  }
})

// The navigation that is specific to user page
export class UserTopNav extends React.Component {
  logout = () => {
    this.props.dispatch(clearUser());
  }
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-sm navbar-dark fixed-top d-block d-lg-none">
          <div class="container">
            <a href="" class="navbar-brand">
              <strong class="text-capitalize">{this.props.name}</strong>
              <br />
              <p class="h6">{this.props.title}</p>
            </a>
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navMenu">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <Link to="/events" className="nav-link">My events</Link>
                </li>
                <li class="nav-item">
                  <Link to="/addEvent" className="nav-link">Add Events</Link>
                </li>
                <li class="nav-item">
                  <Link to="/centers2" className="nav-link">Centers</Link>
                </li>
                <AdminOptions isAdmin={this.props.isAdmin}/>
                <li class="nav-item">
                  <Link to="/" className="nav-link" onClick={this.logout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

// The extra options that is displayed when an admin is logged in
const AdminOptions = (props) => {
  if (props.isAdmin) {
    return (
      <span class="d-flex flex-column flex-md-row">
        <li class="nav-item">
          <Link to="/addCenter" class="nav-link">Add Center</Link>
        </li>
        <li class="nav-item">
          <Link to="#" class="nav-link">Transactions</Link>
        </li>
      </span>
    );
  } else {
    return null;
  }
}
