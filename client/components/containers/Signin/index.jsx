import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateSigninInputs } from '../../../helpers/inputValidators';
import { loginUser } from '../../../actions/authAction';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import './styles.scss';
import View from './View';

@connect(store => (
  {
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
      return (<Redirect to="/events" />);
    }
    return (
      <View
        loggingUserStarted={this.props.loggingUserStarted}
        loggingUserError={this.props.loggingUserError}
        inputErrors={this.state.inputErrors}
        getInput={this.getInput}
        login={this.login}
      />);
  }
}


Signin.defaultProps = {
  loggingUserStarted: false,
  loggingUserResolved: false,
  loggingUserError: '',
  dispatch: () => {},
};

Signin.propTypes = {
  loggingUserStarted: PropTypes.bool,
  loggingUserResolved: PropTypes.bool,
  loggingUserError: PropTypes.string,
  dispatch: PropTypes.func,
};

export default Signin;
