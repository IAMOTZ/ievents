import React from 'react';
import { Link } from 'react-router-dom';

import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <div id="home-container">
        <TopNavigation />
        <section id="main-content-section">
          <div class="dark-overlay">
            <div id="main-content" class="d-flex flex-column align-items-center text-center">
              <h1 class="display-2 text-center">Welcome to<strong> Ievents</strong></h1>
              <p class="display-4 d-none d-sm-block">Get the perfect center for your events</p>
              <p className="display-4 d-block d-sm-none" style={{ fontSize: '2.0rem' }}>Get the perfect center for your events</p>
              <div class="search-box input-group w-50 mt-5">
                <input type="text" class="form-control" placeholder="Search for a center" />
                <div class="input-group-btn">
                  <button type="button" class="btn dropdown-toggle d-none d-md-block" data-toggle="dropdown">Search with</button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#">Location</a>
                    <div role="separator" class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Name</a>
                  </div>
                </div>
              </div>
              <Link to="/centers1" class="btn btn-secondary mt-3">Checkout Our Centers</Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}