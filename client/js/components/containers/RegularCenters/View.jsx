import React from 'react';
import PropTypes from 'prop-types';
import { RegularTopNavigation } from '../../common/TopNavigation';
import Footer from '../../common/Footer';
import CenterCards from '../../common/CenterCards';
import { CenterModal } from '../../common/Modals';
import { LoadingBox } from '../../common/LoadingAnimation';

const View = props => (
  <div id="centers1-container">
    <RegularTopNavigation />
    {
      props.centers.length === 0 && props.fetchingCenterStarted ?
        <LoadingBox iconSize={4} /> :
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
                <CenterCards centers={props.centers} btnAction={props.showModal} />
              </div>
            </div>
          </div>
        </section>
    }
    {/* Modal */}
    {
      props.modalContent ? <CenterModal
        modalContent={props.modalContent}
        onBook={props.onBook}
        redirectPath="/users/login"
      /> : null
    }
    <Footer />
  </div>
);

View.defaultProps = {
  modalContent: {},
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  centers: PropTypes.array.isRequired,
  onBook: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  modalContent: PropTypes.object,
  fetchingCenterStarted: PropTypes.bool.isRequired,
};

export default View;

