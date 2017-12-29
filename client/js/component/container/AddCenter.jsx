import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  addCenter,
  clearStatus,
} from '../../actions/centerActions';

import UserSideNav from '../common/SideNavigation.jsx';
import Header from '../common/Header.jsx';
import ImageInput from '../common/ImageInput.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import WarningAlert from '../common/WarningAlert.jsx';
import { LoadingIcon } from '../common/LoadingAnimation.jsx'

@connect((store) => {
  return {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    status: {
      error: store.centers.status.addingError.message,
      success: store.centers.status.added,
      adding: store.centers.status.adding,
    }
  }
})

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
      images: files,
    });
  }

  add = () => {
    const {
      name,
      location,
      details,
      capacity,
      price,
      images,
    } = this.state;
    const centerDetails = { name, location, details, capacity, price, };
    const fd = new FormData();
    for (let detail in centerDetails) {
      if (centerDetails[detail]) {
        fd.append(`${detail}`, centerDetails[detail]);
      }
    }
    if (images) {
      for (let i = 0; i < images.length; i += 1) {
        fd.append('images', images[i]);
      }
    }
    this.props.dispatch(addCenter(fd, this.props.user.token));
    window.scrollTo(0, 0);
  }

  render() {
    if (!this.props.authenticated) {
      return (<Redirect to="/users/login" />)
    } else if (this.props.status.success) {
      return (<Redirect to="/centers2" />);
    } else {
      return (
        <div class="add-center-container">
          {/* Top navigation on small screen */}
          <UserTopNav name={this.props.user.name} title='Add a center' />
          <div className="container-fluid">
            <div className="row">
              {/*  Side navigation on large screen */}
              <UserSideNav userName={this.props.user.name} />
              {/* Main content */}
              <div class="col-lg-10 offset-md-2" id="add-event-section">
                {/* Content Header(navigation) on large screen */}
                <Header text='Add a center' />
                {/* Input form */}
                <form class="mt-lg-5 mb-md-5 w-lg-50">
                  <LoadingIcon start={this.props.status.adding} size={2} />
                  <WarningAlert message={this.props.status.error} />
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="email"
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
                      class="form-control"
                      id="description" rows="7"
                      name="details"
                      placeholder="More details about the center"
                      onChange={this.getInput}></textarea>
                    <small class="form-text text-muted">Less than 300 characters</small>
                  </div>
                  <div class="form-group">
                    <label for="capacity">Capacity</label>
                    <input type="number"
                      class="form-control"
                      id="capacity"
                      name="capacity"
                      placeholder="How many seats"
                      onChange={this.getInput} />
                  </div>
                  <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number"
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
                        newImage={this.state.images ? this.state.images[0] : null}
                      />
                    </div>
                  </div>
                  <div class="ml-3 pt-3">
                    <button class="btn btn-outline-dark" disabled={this.props.status.adding} onClick={this.add}>Add</button>
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