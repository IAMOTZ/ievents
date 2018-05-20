import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import Header from '../../common/Header';
import CenterCards from '../../common/CenterCards';
import { CenterModal } from '../../common/Modals';
import { LoadingBox } from '../../common/LoadingAnimation';
import { AuthTopNavigation } from '../../common/TopNavigation';

const View = props => (
  <div id="centers2-container">
    <AuthTopNavigation
      name={props.userName}
      title="Centers"
      isAdmin={props.isAdmin}
      isSuperAdmin={props.isSuperAdmin}
      dispatch={props.dispatch}
    />
    <div className="container-fluid">
      <div className="row">
        <SideNavigation
          name={props.userName}
          isAdmin={props.isAdmin}
          isSuperAdmin={props.isSuperAdmin}
          dispatch={props.dispatch}
        />
        <div className="col-lg-10 offset-lg-2 mt-lg-0" id="main-content">
          <Header text="Centers" />
          {
            props.centers.length === 0 && props.fetchingCentersStarted ?
              <LoadingBox iconSize={4} /> :
              <section id="centers-section">
                <div className="container">
                  {/* Search Box */}
                  <div
                    id="center-section-content"
                    className="d-flex flex-column align-items-center"
                  >
                    <div className="input-group w-50 mt-lg-5 search-box">
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
                  <div className="mt-5">
                    <div className="row">
                      <CenterCards
                        centers={props.centers}
                        btnAction={props.showModal}
                        editAction={props.onEdit}
                        isAdmin={props.isAdmin || props.isSuperAdmin}
                      />
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
        </div>
      </div>
    </div>
  </div>
);

View.defaultProps = {
  modalContent: {},
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  centers: PropTypes.array.isRequired,
  fetchingCentersStarted: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  modalContent: PropTypes.object,
  onBook: PropTypes.func.isRequired,
};

export default View;
