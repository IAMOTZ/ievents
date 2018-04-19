import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateSignupInputs } from '../../helpers/inputValidators';
import { createUser } from '../../actions/authAction';
import { stopAsyncProcess } from '../../actions/commonActions';
import * as asyncProcess from '../../actions/asyncProcess';
import TopNavigation from '../common/TopNavigation';
import Footer from '../common/Footer';
import { LoadingIcon } from '../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../common/Alert';

@connect(store => (
  {
    user: store.authReducer.user,
    loggingUserStarted: store.authReducer.loggingUserStarted,
    loggingUserResolved: store.authReducer.loggingUserResolved,
    loggingUserError: store.authReducer.loggingUserResolved,
  }
))
class Signup extends React.Component {
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
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_USER));
  }

  /**
   * Stores the user inputs in the state of this component.
   * @param {Event} event The event object.
   */
  getInput = (event) => {
    const state = { ...this.state };
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /**
   * Clears all the inputErrors in the state.
   */
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
   * @param {Event} event The event object.
   */
  register = (event) => {
    event.preventDefault();
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_USER));
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
    if (this.props.loggingUserResolved) {
      return (<Redirect to="/addEvent" />);
    }
    return (
      <div id="sign-up-container">
        <TopNavigation />
        <div className="d-flex flex-column align-items-center main-content">
          <LoadingIcon start={this.props.loggingUserStarted} size={3} />
          <div className="card card-form">
            <h1 className="card-header">Sign up</h1>
            <div className="card-body">
              <BigAlert message={this.props.loggingUserError} />
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
                  className="btn btn-block dark-button text-white mt-4"
                  disabled={this.props.loggingUserStarted}
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
}

export default Signup;
