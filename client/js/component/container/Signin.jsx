import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser, clearStatus } from '../../actions/authAction';

import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';
import { WarningAlert } from '../common/Alert';
import { LoadingIcon } from '../common/LoadingAnimation.jsx'


@connect((store) => {
  return {
    user: store.user,
    error: store.user.status.error.message,
    status: {
      fetching: store.user.status.fetching,
    }
  }
})

export default class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearStatus('ERROR'));
  }

  // This method uses user input to update the state
  getInput = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  // This method fires the action to log in a user
  login = () => {
    const {
     email, password,
    } = this.state;
    this.props.dispatch(loginUser({
      email,
      password
    }));
  }

  render() {
    if (this.props.user.status.fetched === true) {
      return (
        <div>
          <Redirect to="/addEvent" />
        </div>
      );
    } else {
      return (
        <div id="sign-in-container">
          <TopNavigation />
          <div className="d-flex flex-column align-items-center main-content">
            <LoadingIcon start={this.props.status.fetching} size={3} />
            <div className="m-2">
              <WarningAlert message={this.props.error} />
            </div>
            <div className="card card-form">
              <h1 className="card-header">Sign in</h1>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-envelope"></i>
                      </div>
                      <input type="email" className="form-control" id="email" placeholder="Your Email" name="email" onChange={this.getInput} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-user-secret"></i>
                      </div>
                      <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={this.getInput} />
                    </div>
                  </div>
                  <button className="btn btn-block dark-button text-white" disabled={this.props.status.fetching} onClick={this.login}>Log in</button>
                  <div className="text-center mt-2">
                    <a href="" className="text-muted">forgot password?</a>
                  </div>
                </form>
              </div>
            </div>
            <Footer />
          </div>

        </div>
      );
    }

  }
}
