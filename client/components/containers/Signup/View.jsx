import React from 'react';
import PropTypes from 'prop-types';
import { RegularTopNavigation } from '../../common/TopNavigation';
import Footer from '../../common/Footer';
import { LoadingIcon } from '../../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../../common/Alert';

const View = props => (
  <div id="sign-up-container">
    <RegularTopNavigation />
    <div className="d-flex flex-column align-items-center page-content">
      <LoadingIcon start={props.loggingUserStarted} size={3} />
      <div className="card card-form">
        <h1 className="card-header">Sign up</h1>
        <div className="card-body">
          <BigAlert message={props.loggingUserError} />
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
                  onChange={props.getInput}
                />
              </div>
              <small
                className="form-text text-muted"
              >Can contain letters and numbers alone
              </small>
              <SmallAlert message={props.inputErrors.nameError} />
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
                  onChange={props.getInput}
                />
              </div>
              <SmallAlert message={props.inputErrors.emailError} />
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
                  onChange={props.getInput}
                />
              </div>
              <small
                className="form-text text-muted"
              >Must contain capital, small letters and numbers
              </small>
              <SmallAlert message={props.inputErrors.passwordError} />
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
                  onChange={props.getInput}
                />
              </div>
              <SmallAlert message={props.inputErrors.confirmPasswordError} />
            </div>
            <button
              className="btn btn-block ie-blue-button mt-4"
              disabled={props.loggingUserStarted}
              onClick={props.register}
            >Register
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

View.defaultProps = {
  loggingUserError: '',
  inputErrors: {},
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  loggingUserStarted: PropTypes.bool.isRequired,
  loggingUserError: PropTypes.string,
  inputErrors: PropTypes.object,
  getInput: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default View;
