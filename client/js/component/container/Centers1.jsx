import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions.
import { getAllCenters, showCenterModal } from '../../actions/centerActions';
// Common components.
import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';
import CenterCards from '../common/CenterCards.jsx';
import { CenterModal } from '../common/Modal';
import { LoadingContainer } from '../common/LoadingAnimation.jsx';

@connect(store => (
  {
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
    isUserFetched: store.user.status.fetched,
    status: {
      fetching: store.centers.status.fetching,
    },
  }
))
export default class Centers1 extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  /**
   * Displays the center modal.
   * It uses the center ID to get the details of the center to show.
   * @param {Event} event The event object.
   */
  showModal = (event) => {
    this.props.dispatch(showCenterModal(event.target.id));
  }

  render() {
    let component;
    if (this.props.isUserFetched) {
      component = (
        <Redirect to="/addEvent" />
      );
    } else {
      component = (
        <div id="centers1-container">
          <TopNavigation />
          {
            this.props.centers.length === 0 && this.props.status.fetching ?
              <LoadingContainer iconSize={4} /> :
              <section id="centers-section" className="mb-5">
                <div className="container">
                  {/* Search Box */}
                  <div
                    id="center-section-content"
                    className="d-flex flex-column align-items-center"
                  >
                    <div id="center-section-header">
                      <h1 className="display-4">A special center for a special event</h1>
                    </div>
                    <div className="search-box input-group w-50 mt-5">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a center"
                      />
                      <div className="input-group-btn d-none d-sm-block">
                        <button
                          type="button"
                          className="btn btn-secondary dropdown-toggle"
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
                    <div className="search-box mt-3 d-block d-sm-none">
                      <button
                        type="button"
                        className="btn btn-secondary dropdown-toggle"
                        data-toggle="dropdown"
                      >Search with
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Location</a>
                        <div role="separator" className="dropdown-divider" />
                        <a className="dropdown-item" href="#">Name</a>
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
            redirectPath="/users/login"
          />
          <Footer />
        </div>
      );
    }
    return component;
  }
}
