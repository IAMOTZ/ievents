import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addCenter, clearStatus } from '../../actions/centerActions';

import styles from '../../../sass/addCenter.scss';
import UserSideNav from '../common/SideNavigation.jsx';
import Header from '../common/Header.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { WarningAlert } from '../common/Alert';

@connect((store) => {
  return {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    status: {
      error: store.centers.status.addingError.message,
      success: store.centers.status.added,
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
      image: null,
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearStatus());
  }

  // This method uses user input to update the state
  getInput = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  // This method fires the action to create an event
  add = () => {
    const {
      name,
      location,
      details,
      capacity,
      price,
      type,
      image,
    } = this.state;
    const centerDetails = { name, location, details, capacity, price, type, image };
    this.props.dispatch(addCenter(centerDetails, this.props.user.token));
  }

  render() {
    if (!this.props.authenticated) {
      return (<Redirect to="/users/login" />)
    } else if (this.props.status.success) {
      return (<Redirect to="/centers2" />);
    } else {
      return (
        <div>
          {/* Top navigation on small screen */}
          <UserTopNav name={this.props.user.name} title='Add Event' />

          <div className="container-fluid">
            <div className="row">

              {/*  Side navigation on large screen */}
              <UserSideNav userName={this.props.user.name} />

              {/* Main content */}
              <div class="col-lg-10 offset-md-2" id="add-event-section">

                {/* Content Header(navigation) on large screen */}
                <Header text='Add a center' />

                {/* Input form */}
                <form class="mt-lg-5 mb-md-5">
                  <div className="w-lg-50">
                    <WarningAlert message={this.props.status.error} />
                  </div>
                  <div class="form-group row">
                    <label for="name" class="col-sm-1 col-form-label">Name</label>
                    <div class="col-sm-11">
                      <input type="email"
                        class="form-control w-lg-50"
                        id="name"
                        name="name"
                        placeholder="The name of the center"
                        onChange={this.getInput} />
                      <small class="form-text text-muted">Less than 30 characters</small>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="location" class="col-sm-1 col-form-label">Location</label>
                    <div class="col-sm-11">
                      <input type="text"
                        class="form-control w-lg-50"
                        id="location"
                        name="location"
                        placeholder="The location of the center"
                        onChange={this.getInput} />
                      <small class="form-text text-muted">Less than 30 characters</small>                        
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="description" class="col-sm-1 col-form-label">Details</label>
                    <div class="col-sm-11">
                      <textarea
                        class="form-control w-lg-50"
                        id="description" rows="7"
                        name="description"
                        placeholder="More details about the center"
                        onChange={this.getInput}></textarea>
                      <small class="form-text text-muted">Less than 200 characters</small>                        
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="capacity" class="col-sm-1 col-form-label">Capacity</label>
                    <div class="col-sm-11">
                      <input type="number"
                        class="form-control w-lg-50"
                        id="capacity"
                        name="capacity"
                        placeholder="How many seats"
                        onChange={this.getInput} />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="price" class="col-sm-1 col-form-label">Price</label>
                    <div class="col-sm-11">
                      <input type="number"
                        class="form-control w-lg-50"
                        id="price"
                        name="price"
                        placeholder="Price"
                        onChange={this.getInput} />
                    </div>
                  </div>
                  <fieldset class="form-group">
                    <div className="row">
                      <legend class="col-form-legend col-sm-1">Type</legend>
                      <div class="col-sm-11 pt-2">
                        <div class="form-check form-check-inline">
                          <label class="form-check-label">
                            <input type="radio"
                              class="form-check-input"
                              name="type"
                              id="inlineRadio1"
                              value="theater"
                              onClick={this.getInput} /> Theater
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <label class="form-check-label">
                            <input type="radio"
                              class="form-check-input"
                              name="type"
                              id="inlineRadio2"
                              value="banquet"
                              onClick={this.getInput} /> Banquet
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <div class="form-group row ">
                    <label for="image" class="col-sm-1 col-form-label">Image</label>
                    <div className="col-sm-11">
                      <input type="file"
                        class="form-control-file pt-2"
                        id="image"
                        name="image" />
                    </div>
                  </div>
                  <div class="text-center w-25 pt-3">
                    <a class="btn btn-outline-dark" onClick={this.add}>Add</a>
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