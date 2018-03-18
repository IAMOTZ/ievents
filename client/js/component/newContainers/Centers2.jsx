import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { find } from 'lodash';
import {
  getAllCenters, setCenterToUpdate,
} from '../../actions/centerActions';
import { setCenterToBook } from '../../actions/eventActions';
import UserSideNav from '../common/SideNavigation';
import Header from '../common/Header';
import CenterCards from '../common/CenterCards';
import { CenterModal } from '../common/Modal';
import { LoadingContainer } from '../common/LoadingAnimation';
import { UserTopNav } from '../common/TopNavigation';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    user,
    isAdmin: user.role === 'admin',
    isSuperAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isUserAuthenticated: store.authReducer.loggingUserResolved,
    fetchingCentersStarted: store.fetchCentersReducer.fetchingCenterStarted,
    centers: store.fetchCentersReducer.centers,
  };
})
class Centers2 extends React.Component {
  constructor() {
    super();
    this.state = {
      modalContent: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  /**
   * It updates the store about a center that is to be edited.
   * @param {Event} event The event object.
   */
  onEdit = (event) => {
    this.props.dispatch(setCenterToUpdate(event.target.id));
  }

  /**
   * It updates the store about a center that is to be booked.
   * @param {Number} centerId The ID of the center.
   */
  onBook = (centerId) => {
    this.props.dispatch(setCenterToBook(centerId));
  }

  /**
   * Displays the center modal.
   * It uses the center ID to get the details of the center to show.
   * @param {Event} event The event object.
   */
  showModal = (event) => {
    const state = { ...this.state };
    const centerId = Number(event.target.id);
    state.modalContent = find(this.props.centers, { id: centerId });
    this.setState(state);
  }

  render() {
    if (!this.props.isUserAuthenticated) {
      return (<Redirect to="/users/login" />);
    }
    return (
      <div id="centers2-container">
        {/* Top Navigarion on Small screen */}
        <UserTopNav
          name={this.props.user.name}
          title="Centers"
          isAdmin={this.props.isAdmin}
          isSuperAdmin={this.props.isSuperAdmin}
          dispatch={this.props.dispatch}
        />
        <div className="container-fluid">
          <div className="row">
            {/* Side Navigation on large screen */}
            <UserSideNav
              name={this.props.user.name}
              isAdmin={this.props.isAdmin}
              isSuperAdmin={this.props.isSuperAdmin}
              dispatch={this.props.dispatch}
            />
            {/* Main content */}
            <div className="col-lg-10 offset-lg-2 mt-lg-0" id="main-content">
              {/* Content Headers */}
              <Header text="Centers" />
              {
                this.props.centers.length === 0 && this.props.fetchingCentersStarted ?
                  <LoadingContainer iconSize={4} /> :
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
                      {/* Centers  Grid */}
                      <div className="mt-5">
                        <div className="row">
                          <CenterCards
                            centers={this.props.centers}
                            btnAction={this.showModal}
                            editAction={this.onEdit}
                            isAdmin={this.props.isAdmin || this.props.isSuperAdmin}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
              }
              {/* Modal */}
              {
                this.state.modalContent ? <CenterModal
                  modalContent={this.state.modalContent}
                  onBook={this.onBook}
                  redirectPath="/users/login"
                /> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Centers2;
