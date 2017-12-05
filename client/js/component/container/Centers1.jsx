import React from 'react';
import { connect } from 'react-redux';
import getAllCenters from '../../actions/centerActions';

import centersStyles from '../../../sass/centers.scss';
import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';
import CenterCards from '../common/CenterCards.jsx';

@connect((store) => {
  return {
    centers: store.centers.centers,
  }
})

export default class Centers1 extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  render() {
    return (
      <div>
        <TopNavigation />
        <section id="centers-section">
          <div className="container">
            {/* Search Box */}
            <div id="center-section-content" class="d-flex flex-column align-items-center">
              <div id="center-section-header">
                <h1 class="display-4">A special center for a special event</h1>
              </div>
              <div class="search-box input-group w-50 mt-5">
                <input type="text" class="form-control" placeholder="Search for a center" />
                <div class="input-group-btn d-none d-sm-block">
                  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                    Search with
                  </button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#">Location</a>
                    <div role="separator" class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Name</a>
                  </div>
                </div>
              </div>
              <div class="search-box mt-3 d-block d-sm-none">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                  Search with
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Location</a>
                  <div role="separator" class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Name</a>
                </div>
              </div>
            </div>
            {/* Centers Grid */}
            <div className="mt-5">
              <div className="row">
                <CenterCards centers={this.props.centers} />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}