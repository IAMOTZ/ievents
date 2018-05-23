import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateSignupInputs } from '../../../helpers/inputValidators';
import { createUser } from '../../../actions/authAction';
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
      <View
        loggingUserStarted={this.props.loggingUserStarted}
        loggingUserError={this.props.loggingUserError}
        inputErrors={this.state.inputErrors}
        getInput={this.getInput}
        register={this.register}
      />);
  }
}

Signup.defaultProps = {
  loggingUserStarted: false,
  loggingUserResolved: false,
  loggingUserError: '',
  dispatch: () => {},
};

Signup.propTypes = {
  loggingUserStarted: PropTypes.bool,
  loggingUserResolved: PropTypes.bool,
  loggingUserError: PropTypes.string,
  dispatch: PropTypes.func,
};

export default Signup;
