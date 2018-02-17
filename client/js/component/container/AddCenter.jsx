import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Actions.
import { addCenter, clearStatus } from '../../actions/centerActions';
// Common Components.
import UserSideNav from '../common/SideNavigation.jsx';
import Header from '../common/Header.jsx';
import ImageInput from '../common/ImageInput.jsx';
import WarningAlert from '../common/WarningAlert.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { LoadingIcon } from '../common/LoadingAnimation.jsx';

@connect(store => (
  {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    isAdmin: (store.user.user.role === 'admin'),
    isSuperAdmin: (store.user.user.role === 'superAdmin'),
    status: {
      error: store.centers.status.addingError.message,
      success: store.centers.status.added,
      adding: store.centers.status.adding,
    },
  }
))
export default class AddCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      location: null,
      details: null,
      capacity: null,
      price: null,
      type: null,
      images: null,
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearStatus('ALL'));
  }

  /**
   * Update some state variables with the user inputs.
   * @param {Event} e The event object.
   */
  getInput = (e) => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  /**
   * A callback to update the state after the user uploads an image.
   * @param {File} files The image file.
   */
  handleImageDrop = (files) => {
    this.setState({ images: files });
  }

  /**
   * Dispatches the action to add the center.
   */
  add = () => {
    const {
      name, location, details, capacity, price, images,
    } = this.state;
    const centerDetails = {
      name, location, details, capacity, price,
    };
    const fd = new FormData();
    const entries = Object.entries(centerDetails);
    entries.forEach((entry) => {
      const key = entry[0];
      const value = entry[1];
      if (value) {
        fd.append(key, value);
      }
    });
    if (images) {
      fd.append('image', images[0]);
    }
    this.props.dispatch(addCenter(fd, this.props.user.token));
    window.scrollTo(0, 0);
  }

  render() {
    let component;
    if (!this.props.authenticated) {
      component = (<Redirect to="/users/login" />);
    } else if (this.props.status.success) {
      component = (<Redirect to="/centers2" />);
    } else {
      component = (
        <div className="add-center-container">
          {/* Top navigation on small screen */}
          <UserTopNav
            name={this.props.user.name}
            title="Add a center"
            isAdmin={this.props.isAdmin}
            isSuperAdmin={this.props.isSuperAdmin}
            dispatch={this.props.dispatch}
          />
          <div className="container-fluid">
            <div className="row">
              {/*  Side navigation on large screen */}
              <UserSideNav
                name={this.props.user.name}
                isAdmin={this.props.isAdmin}
                isSuperAdmin={this.props.isSuperAdmin}
                dispatch={this.props.dispatch}
              />
              {/* Main content */}
              <div className="col-lg-10 offset-md-2" id="add-event-section">
                {/* Content Header(navigation) on large screen */}
                <Header text="Add a center" />
                {/* Input form */}
                <form className="mt-lg-5 mb-md-5">
                  <LoadingIcon start={this.props.status.adding} size={2} />
                  <div className="w-lg-50 mx-auto">
                    <WarningAlert message={this.props.status.error} />
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="email"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="The name of the center"
                            onChange={this.getInput}
                          />
                          <small className="form-text text-muted">Less than 30 characters</small>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="form-group">
                          <label htmlFor="location">Location</label>
                          <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            placeholder="The location of the center"
                            onChange={this.getInput}
                          />
                          <small className="form-text text-muted">Less than 30 characters</small>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="form-group">
                          <label htmlFor="details">Details</label>
                          <textarea
                            className="form-control"
                            id="details"
                            rows="7"
                            name="details"
                            placeholder="More details about the center"
                            onChange={this.getInput}
                          />
                          <small className="form-text text-muted">Less than 300 characters</small>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="capacity">Capacity</label>
                              <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                name="capacity"
                                placeholder="How many seats"
                                onChange={this.getInput}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="price">Price</label>
                              <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                placeholder="Price"
                                onChange={this.getInput}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="image">Image</label>
                              <div className="text-center">
                                <ImageInput
                                  style={{ height: '100px' }}
                                  id="image"
                                  onDrop={this.handleImageDrop}
                                  newImage={this.state.images ? this.state.images[0] : null}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="ml-3 pt-3">
                            <button
                              id="add-btn"
                              className="btn btn-outline-dark"
                              disabled={this.props.status.adding}
                              onClick={this.add}
                            >Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <footer className="d-block d-sm-none mt-5">
            <div className="container text-white text-center py-5">
              <h1>Ievents</h1>
              <p>Copyright &copy; 2017</p>
            </div>
          </footer>
        </div>
      );
    }
    return component;
  }
}
