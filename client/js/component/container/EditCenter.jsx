import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Actions.
import { updateCenter, clearStatus } from '../../actions/centerActions';
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
    toEdit: store.centers.toEdit,
    status: {
      error: store.centers.status.updatingError.message,
      success: store.centers.status.updated,
      updating: store.centers.status.updating,
    },
  }
))
export default class EditCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      location: null,
      details: null,
      capacity: null,
      price: null,
      newImages: null,
    }
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
    this.setState({
      newImages: files,
    });
  }

  /**
   * Dispatches the action to update the center.
   */
  update = () => {
    const {
      name, location, details, capacity, price, newImages,
    } = this.state;
    const centerId = this.props.toEdit.id;
    const centerDetails = {
      name, location, details, capacity, price,
    };
    const fd = new FormData();
    const entries = Object.entries(centerDetails);
    entries.forEach((entry) => {
      fd.append(`${entry[0]}`, entry[1]);
    });
    if (newImages) {
      fd.append('image', newImages[0]);
    }
    this.props.dispatch(updateCenter(centerId, fd, this.props.user.token));
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
          <UserTopNav name={this.props.user.name} title="Edit Center" />
          <div className="container-fluid">
            <div className="row">
              {/*  Side navigation on large screen */}
              <UserSideNav userName={this.props.user.name} />
              {/* Main content */}
              <div className="col-lg-10 offset-md-2" id="add-event-section">
                {/* Content Header(navigation) on large screen */}
                <Header text="Edit Center" />
                {/* Input form */}
                <form className="mt-lg-5 mb-md-5 w-lg-50">
                  <LoadingIcon start={this.props.status.updating} size={2} />
                  <WarningAlert message={this.props.status.error} />
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={this.props.toEdit.name}
                      className="form-control"
                      placeholder="The name of the center"
                      onChange={this.getInput}
                    />
                    <small className="form-text text-muted">Less than 30 characters</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      defaultValue={this.props.toEdit.location}
                      className="form-control"
                      placeholder="The location of the center"
                      onChange={this.getInput}
                    />
                    <small className="form-text text-muted">Less than 30 characters</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Details</label>
                    <textarea
                      defaultValue={this.props.toEdit.details}
                      className="form-control"
                      id="details"
                      rows="7"
                      name="details"
                      placeholder="More details about the center"
                      onChange={this.getInput} />
                    <small className="form-text text-muted">Less than 200 characters</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      id="capacity"
                      name="capacity"
                      type="number"
                      defaultValue={this.props.toEdit.capacity}
                      className="form-control"
                      placeholder="How many seats"
                      onChange={this.getInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      defaultValue={this.props.toEdit.price}
                      className="form-control"
                      placeholder="Price"
                      onChange={this.getInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <div className="text-center">
                      <ImageInput
                        id="image"
                        onDrop={this.handleImageDrop}
                        newImage={this.state.newImages ? this.state.newImages[0] : null}
                        previousImage={
                          this.props.toEdit.images ? this.props.toEdit.images[0] : null
                        }
                      />
                    </div>
                  </div>
                  <div className="ml-3 pt-3">
                    <button
                      className="btn btn-outline-dark"
                      disabled={this.props.status.updating}
                      onClick={this.update}
                    >Update
                    </button>
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
