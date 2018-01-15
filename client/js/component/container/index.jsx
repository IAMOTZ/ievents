import React from 'react';
import { Link } from 'react-router-dom';
// Common components.
import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';

const Home = () => (
  <div id="home-container">
    <TopNavigation />
    <section id="main-content-section">
      <div className="dark-overlay">
        <div
          id="main-content"
          className="d-flex flex-column align-items-center text-center"
        >
          <h1 className="display-2 text-center">Welcome to<strong> Ievents</strong>
          </h1>
          <p className="display-4 d-none d-sm-block">Get the perfect center for your events</p>
          <p
            className="display-4 d-block d-sm-none"
            style={{ fontSize: '2.0rem' }}
          >Get the perfect center for your events
          </p>
          <div className="search-box input-group w-50 mt-5">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a center"
            />
            <div className="input-group-btn">
              <button
                type="button"
                className="btn dropdown-toggle d-none d-md-block"
                data-toggle="dropdown"
              >Search with
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">Location</a>
                <div role="separator" className="dropdown-divider" />
                <a className="dropdown-item" href="#">Name</a>
              </div>
            </div>
          </div>
          <Link to="/centers1" className="btn btn-secondary mt-3">Checkout Our Centers</Link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Home;
