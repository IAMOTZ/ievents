import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateCenter, clearStatus } from '../../actions/centerActions';

import UserSideNav from '../common/SideNavigation.jsx';
import Header from '../common/Header.jsx';
import ImageInput from '../common/ImageInput.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { WarningAlert } from '../common/Alert';
import { LoadingIcon } from '../common/LoadingAnimation.jsx'

@connect((store) => {
  return {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    toEdit: store.centers.toEdit,
    status: {
      error: store.centers.status.updatingError.message,
      success: store.centers.status.updated,
      updating: store.centers.status.updating,
    }
  }
})

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

  // This method uses user input to update the state
  getInput = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleImageDrop = (files) => {
    this.setState({
      newImages: files,
    });
  }

  // This method fires the action to create an event
  update = () => {
    const {
      name,
      location,
      details,
      capacity,
      price,
      newImages,
    } = this.state;
    const centerId = this.props.toEdit.id;
    const centerDetails = { name, location, details, capacity, price, };
    const fd = new FormData();
    for (let detail in centerDetails) {
      if (centerDetails[detail]) {
        fd.append(`${detail}`, centerDetails[detail]);
      }
    }
    if (newImages) {
      for (let i = 0; i < newImages.length; i += 1) {
        fd.append('images', newImages[i]);
      }
    }
    this.props.dispatch(updateCenter(centerId, fd, this.props.user.token));
    window.scrollTo(0, 0);
  }

  render() {
    if (!this.props.authenticated) {
      return (<Redirect to="/users/login" />)
    } else if (this.props.status.success) {
      return (<Redirect to="/centers2" />);
    } else {
      return (
        <div className="add-center-container">
          {/* Top navigation on small screen */}
          <UserTopNav name={this.props.user.name} title='Edit Center' />
          <div class="container-fluid">
            <div class="row">
              {/*  Side navigation on large screen */}
              <UserSideNav userName={this.props.user.name} />
              {/* Main content */}
              <div class="col-lg-10 offset-md-2" id="add-event-section">
                {/* Content Header(navigation) on large screen */}
                <Header text='Edit Center' />
                {/* Input form */}
                <form class="mt-lg-5 mb-md-5 w-lg-50">
                  <LoadingIcon start={this.props.status.updating} size={2} />
                  <WarningAlert message={this.props.status.error} />
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text"
                      defaultValue={this.props.toEdit.name}
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="The name of the center"
                      onChange={this.getInput} />
                    <small class="form-text text-muted">Less than 30 characters</small>
                  </div>
                  <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text"
                      defaultValue={this.props.toEdit.location}
                      class="form-control"
                      id="location"
                      name="location"
                      placeholder="The location of the center"
                      onChange={this.getInput} />
                    <small class="form-text text-muted">Less than 30 characters</small>
                  </div>
                  <div class="form-group">
                    <label for="description">Details</label>
                    <textarea
                      defaultValue={this.props.toEdit.details}
                      class="form-control"
                      id="details" rows="7"
                      name="details"
                      placeholder="More details about the center"
                      onChange={this.getInput}></textarea>
                    <small class="form-text text-muted">Less than 200 characters</small>
                  </div>
                  <div class="form-group">
                    <label for="capacity">Capacity</label>
                    <input type="number"
                      defaultValue={this.props.toEdit.capacity}
                      class="form-control"
                      id="capacity"
                      name="capacity"
                      placeholder="How many seats"
                      onChange={this.getInput} />
                  </div>
                  <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number"
                      defaultValue={this.props.toEdit.price}
                      class="form-control"
                      id="price"
                      name="price"
                      placeholder="Price"
                      onChange={this.getInput} />
                  </div>
                  <div class="form-group">
                    <label for="image">Image</label>
                    <div className="text-center">
                      <ImageInput
                        id="image"
                        onDrop={this.handleImageDrop}
                        newImage={this.state.newImages ? this.state.newImages[0] : null}
                        previousImage={this.props.toEdit.images ? this.props.toEdit.images[0] : null}
                      />
                    </div>
                  </div>
                  <div class="ml-3 pt-3">
                    <button class="btn btn-outline-dark" disabled={this.props.status.updating} onClick={this.update}>Update</button>
                  </div>
                </form>

              </div>
            </div>
          </div>

          <footer class="d-block d-sm-none mt-5">
            <div class="container text-white text-center py-5">
              <h1>Ievents</h1>
              <p>Copyright &copy; 2017</p>
            </div>
          </footer>
        </div>
      );
    }
  }
}
