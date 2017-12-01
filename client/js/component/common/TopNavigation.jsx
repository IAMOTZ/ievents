import React from 'react';
import { Link } from 'react-router-dom';

// The navigation that is returned by default
export default () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
      <div className="container">
        <a href="index.html" className="navbar-brand">
          <strong>Ievents</strong>
        </a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ml-auto">

            <li className="nav-item">
              <a href="index.html" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="centers.html" className="nav-link">Centers</a>
            </li>
            <li className="nav-item">
              {/* <a href="signin.html" className="nav-link">Signin</a> */}
              <Link to="users/login" className="nav-link"> Signin </Link>
            </li>
            <li className="nav-item">
              {/* <a href="#" className="nav-link">Signup</a> */}
              <Link to="/" className="nav-link"> Signup </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// The navigation that is specific to user page
const UserTopNav = (props) => {
  return (
    <div>
      <nav class="navbar navbar-expand-sm navbar-dark fixed-top d-block d-lg-none">
        <div class="container">
          <a href="#" class="navbar-brand">
            <strong>{props.name}</strong>
            <br />
            <p class="h6">{props.title}</p>
          </a>
          <button class="navbar-toggler" data-toggle="collapse" data-target="#navMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navMenu">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link">My events</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">Add Events</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">Centers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

// The navigation that is specific to admin page  
const AdminTopNav = (props) => {
  return (
    <div>
      <nav class="navbar navbar-expand-sm navbar-dark fixed-top d-block d-lg-none">
        <div class="container">
          <a href="#" class="navbar-brand">
            <strong>Admin</strong>
            <br />
            <p class="h6">{ props.title }</p>
          </a>
          <button class="navbar-toggler" data-toggle="collapse" data-target="#navMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navMenu">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a href="adminCenters.html" class="nav-link">Centers</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Add Center</a>
              </li>
              <li class="nav-item">
                <a href="transactions.html" class="nav-link">Transactions</a>
              </li>
              <li class="nav-item">
                <a href="index.html" class="nav-link">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export { UserTopNav, AdminTopNav };
