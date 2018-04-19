import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { getAllCenters } from '../../actions/centerActions';
import { setCenterToBook } from '../../actions/eventActions';
import TopNavigation from '../common/TopNavigation';
import Footer from '../common/Footer';
import CenterCards from '../common/CenterCards';
import { CenterModal } from '../common/Modal';
import { LoadingContainer } from '../common/LoadingAnimation';

@connect(store => (
  {
    isUserAuthenticaed: store.authReducer.loggingUserResolved,
    fetchingCenterStarted: store.fetchCentersReducer.fetchingCenterStarted,
    centers: store.fetchCentersReducer.centers,
  }
))
class Centers1 extends React.Component {
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
    if (this.props.isUserAuthenticaed) {
      return (<Redirect to="/addEvent" />);
    }
    return (
      <div id="centers1-container">
        <TopNavigation />
        {
          this.props.centers.length === 0 && this.props.fetchingCenterStarted ?
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
        {
          this.state.modalContent ? <CenterModal
            modalContent={this.state.modalContent}
            onBook={this.onBook}
            redirectPath="/users/login"
          /> : null
        }
        <Footer />
      </div>
    );
  }
}

export default Centers1;
