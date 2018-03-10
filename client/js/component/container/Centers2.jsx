import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Actions.
import {
  getAllCenters, showCenterModal, initializeEdit, book,
} from '../../actions/centerActions';
// Common Components.
import UserSideNav from '../common/SideNavigation.jsx';
import Header from '../common/Header.jsx';
import CenterCards from '../common/CenterCards.jsx';
import { CenterModal } from '../common/Modal';
import { LoadingContainer } from '../common/LoadingAnimation.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';

@connect(store => (
  {
    authenticated: store.user.status.fetched,
    user: store.user.user,
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
    isAdmin: store.user.user.role === 'admin',
    isSuperAdmin: (store.user.user.role === 'superAdmin'),
    status: {
      fetching: store.centers.status.fetching,
    },
  }
))
export default class Centers2 extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }

  /**
   * It updates the store about a center that is to be edited.
   * @param {Event} event The event object.
   */
  onEdit = (event) => {
    this.props.dispatch(initializeEdit(event.target.id));
  }

  /**
   * It updates the store about a center that is to be booked.
   * @param {Number} centerId The ID of the center.
   */
  onBook = (centerId) => {
    this.props.dispatch(book(centerId));
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
    if (!this.props.authenticated) {
      component = (<Redirect to="/users/login" />);
    } else {
      component = (
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
                  this.props.centers.length === 0 && this.props.status.fetching ?
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
                <CenterModal
                  modalContent={this.props.modalContent}
                  onBook={this.onBook}
                  redirectPath="/addEvent"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return component;
  }
}
