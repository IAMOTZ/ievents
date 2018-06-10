import React from 'react';
import { Link } from 'react-router-dom';
import { RegularTopNavigation } from '../../common/TopNavigation';

const Home = () => (
  <div id="home-container">
    <RegularTopNavigation />
    <div className="dark-overlay">
      <div
        id="page-content"
        className="d-flex flex-column align-items-center text-center"
      >
        <h1 className="display-2 text-center">Welcome to<strong> iEvents</strong>
        </h1>
        <p className="display-4 d-none d-sm-block">Get the perfect center for your events</p>
        <p
          className="display-4 d-block d-sm-none"
          style={{ fontSize: '2.0rem' }}
        >Get the perfect center for your events
        </p>
        <Link to="/explore/centers" className="btn btn-primary mt-3">
          <i className="fa fa-bank fa-fw" aria-hidden="true" />&nbsp; Checkout Our Centers
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
