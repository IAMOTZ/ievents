import React from 'react';

import homeStyles from '../../../sass/home.scss';
import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <TopNavigation />
        <section id="main-content-section">
          <div class="dark-overlay">
            <div id="main-content" class="d-flex flex-column align-items-center">
              <div>
                <h1 class="display-2">Welcome to
                        <strong> Ievents</strong>
                </h1>
              </div>
              <div>
                <p class="display-4">Get the perfect center for you events</p>
              </div>
              <div class="search-box input-group w-50 mt-5">
                <input type="text" class="form-control" placeholder="Search for a center" />
                <div class="input-group-btn">
                  <button type="button" class="btn dropdown-toggle d-none d-md-block" data-toggle="dropdown">
                    Search with
                        </button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#">Location</a>
                    <div role="separator" class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Name</a>
                  </div>
                </div>
              </div>
              <a href="centers.html" class="btn btn-secondary mt-3">Checkout Our Centers</a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}