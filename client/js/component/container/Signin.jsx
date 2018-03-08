import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateSigninInputs } from '../../helpers/inputValidators';
// Actions.
import { loginUser, clearStatus } from '../../actions/authAction';
// Common components.
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
export default class Signin extends React.Component {
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

  /**
   * Dispatches an action to authenticate a user.
   */
  login = (e) => {
    e.preventDefault();
    this.props.dispatch(clearStatus('ERROR'));
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
    let component;
    if (this.props.status.fetched) {
      component = (
        <Redirect to="/addEvent" />
      );
    } else {
      component = (
        <div id="sign-in-container">
          <TopNavigation />
          <div className="d-flex flex-column align-items-center main-content">
            <LoadingIcon start={this.props.status.fetching} size={3} />
            <div className="card card-form">
              <h1 className="card-header">Sign in</h1>
              <div className="card-body">
                <BigAlert message={this.props.error ? 'email or password incorrect' : null} />
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
                    disabled={this.props.status.fetching}
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
    return component;
  }
}
