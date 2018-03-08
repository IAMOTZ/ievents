import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateSignupInputs } from '../../helpers/inputValidators';
// Actions.
import { createUser, clearStatus } from '../../actions/authAction';
// Common Components.
import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';
import { LoadingIcon } from '../common/LoadingAnimation.jsx';
import { BigAlert, SmallAlert } from '../common/Alert.jsx';

@connect(store => (
  {
    user: store.user,
    error: store.user.status.error,
    status: {
      fetching: store.user.status.fetching,
      fetched: store.user.status.fetched,
    },
  }
))
export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      inputErrors: {
        nameError: null,
        emailError: null,
        passwordError: null,
        confirmPasswordError: null,
      },
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearStatus('ERROR'));
  }

  /**
   * Update some state variables with the user inputs.
   * @param {Event} e The event object.
   */
  getInput = (e) => {
    const state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  clearInputErrors = () => {
    const state = { ...this.state };
    state.inputErrors = {
      nameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
    };
    this.setState(state);
  }

  /**
   * It Dispatches an action to register a user.
   */
  register = (e) => {
    e.preventDefault();
    this.props.dispatch(clearStatus('ERROR'));
    const {
      name, email, password, confirmPassword,
    } = this.state;
    const inputErrors = validateSignupInputs(this.state);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      this.props.dispatch(createUser({
        name, email, password, confirmPassword,
      }));
    }
  }

  render() {
    let component;
    if (this.props.status.fetched) {
      component = (<Redirect to="/addEvent" />);
    } else {
      component = (
        <div id="sign-up-container">
          <TopNavigation />
          <div className="d-flex flex-column align-items-center main-content">
            <LoadingIcon start={this.props.status.fetching} size={3} />
            <div className="card card-form">
              <h1 className="card-header">Sign up</h1>
              <div className="card-body">
                <BigAlert message={this.props.error.message} />
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-user" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        onChange={this.getInput}
                      />
                    </div>
                    <small
                      className="form-text text-muted"
                    >Can contain letters and numbers alone
                    </small>
                    <SmallAlert message={this.state.inputErrors.nameError} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-envelope" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        onChange={this.getInput}
                      />
                    </div>
                    <small
                      className="form-text text-muted"
                    >eg: you@yourDomain.com
                    </small>
                    <SmallAlert message={this.state.inputErrors.emailError} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-user-secret" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.getInput}
                      />
                    </div>
                    <small
                      className="form-text text-muted"
                    >Must contain capital, small letters and numbers
                    </small>
                    <SmallAlert message={this.state.inputErrors.passwordError} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-user-secret" />
                      </div>
                      <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={this.getInput}
                      />
                    </div>
                    <SmallAlert message={this.state.inputErrors.confirmPasswordError} />
                  </div>
                  <button
                    className="btn btn-block dark-button text-white"
                    disabled={this.props.status.fetching}
                    onClick={this.register}
                  >Register
                  </button>
                </form>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      );
    }
    return component;
  }
}
