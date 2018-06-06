import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RegularTopNavigation } from '../../common/TopNavigation';
import Footer from '../../common/Footer';
import { LoadingIcon } from '../../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../../common/Alert';

const View = props => (
  <div id="sign-in-container">
    <RegularTopNavigation />
    <div className="d-flex flex-column align-items-center page-content">
      <LoadingIcon start={props.loggingUserStarted} size={3} />
      <div className="card card-form">
        <h1 className="card-header">Log in</h1>
        <div className="card-body">
          <BigAlert message={props.loggingUserError ? 'Email or password incorrect' : null} />
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
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={props.getInput}
                />
              </div>
              <SmallAlert message={props.inputErrors.passwordError} />
            </div>
            <button
              className="btn btn-block ie-blue-button text-white"
              disabled={props.loggingUserStarted}
              onClick={props.login}
            >Log in
            </button>
            <div className="text-center mt-2" style={{ fontSize: '15px' }}>
              <span>{'Don\'t have an account?'}</span>&nbsp;
              <Link to="/users/signup">Sign up</Link>
            </div>
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
  login: PropTypes.func.isRequired,
};

export default View;
