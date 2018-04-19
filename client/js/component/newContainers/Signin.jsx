import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { stopAsyncProcess } from '../../actions/commonActions';
import * as asyncProcess from '../../actions/asyncProcess';
import { validateSigninInputs } from '../../helpers/inputValidators';
import { loginUser } from '../../actions/authAction';
import TopNavigation from '../common/TopNavigation';
import Footer from '../common/Footer';
import { LoadingIcon } from '../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../common/Alert';

@connect(store => (
  {
    user: store.authReducer.user,
    loggingUserStarted: store.authReducer.loggingUserStarted,
    loggingUserResolved: store.authReducer.loggingUserResolved,
    loggingUserError: store.authReducer.loggingUserError,
  }
))
class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      inputErrors: {
        emailError: null,
        passwordError: null,
      },
    };
  }

  componentWillUnmount() {
    this.props.dispatch(stopAsyncProcess(asyncProcess.LOGGING_USER));
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
   * Dispatches an action to authenticate a user.
   */
  login = (event) => {
    event.preventDefault();
    this.props.dispatch(stopAsyncProcess(asyncProcess.LOGGING_USER));
    const { email, password } = this.state;
    const inputErrors = validateSigninInputs(this.state);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      this.props.dispatch(loginUser({ email, password }));
    }
  }

  clearInputErrors = () => {
    const state = { ...this.state };
    state.inputErrors = {
      emailError: null,
      passwordError: null,
    };
    this.setState(state);
  }

  render() {
    if (this.props.loggingUserResolved) {
      return (<Redirect to="/addEvent" />);
    }
    return (
      <div id="sign-in-container">
        <TopNavigation />
        <div className="d-flex flex-column align-items-center main-content">
          <LoadingIcon start={this.props.loggingUserStarted} size={3} />
          <div className="card card-form">
            <h1 className="card-header">Sign in</h1>
            <div className="card-body">
              <BigAlert message={this.props.loggingUserError ? 'email or password incorrect' : null} />
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-envelope" />
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                      name="email"
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
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.getInput}
                    />
                  </div>
                  <SmallAlert message={this.state.inputErrors.passwordError} />
                </div>
                <button
                  className="btn btn-block dark-button text-white"
                  disabled={this.props.loggingUserStarted}
                  onClick={this.login}
                >Log in
                  </button>
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

export default Signin;
