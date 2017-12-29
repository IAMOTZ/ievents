import React from 'react';
import { connect } from 'react-redux';
import { getAllCenters, showCenterModal } from '../../actions/centerActions';

import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';
import CenterCards from '../common/CenterCards.jsx';
import { CenterModal } from '../common/Modal';
import { LoadingContainer } from '../common/LoadingAnimation.jsx';

@connect((store) => {
  return {
    centers: store.centers.centers,
    modalContent: store.centers.modalContent ? store.centers.modalContent : {
      name: null,
      images: [],
      details: null,
      capacity: null,
      price: null,
      bookedOn: [],
      type: null,
    },
    status: {
      fetching: store.centers.status.fetching
    }
  }
})

export default class Centers1 extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  showModal = (e) => {
    this.props.dispatch(showCenterModal(e.target.id));
  }

  render() {
    return (
      <div id="centers1-container">
        <TopNavigation />
        {
          this.props.centers.length === 0 && this.props.status.fetching ? <LoadingContainer iconSize={4} /> :
            <section id="centers-section" className="mb-5">
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
                    <CenterCards centers={this.props.centers} btnAction={this.showModal} />
                  </div>
                </div>
              </div>
            </section>
        }
        {/* Modal */}
        <CenterModal
          modalContent={this.props.modalContent}
          redirectPath={'/users/login'} />
        <Footer />
      </div>
    )
  }
}