/* global $ */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  validateChangePasswordInputs, validateDeleteAccountInputs,
} from '../../../helpers/inputValidators';
import { logOut } from '../../../actions/authAction';
import { changePassword, deleteAccount } from '../../../actions/userActions';
import { getAllEvents } from '../../../actions/eventActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import './styles.scss';
import View from './View';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    events: store.fetchEventsReducer.events,
    changingPasswordStarted: store.changePasswordReducer.changingPasswordStarted,
    changingPasswordResolved: store.changePasswordReducer.changingPasswordResolved,
    changingPasswordError: store.changePasswordReducer.changingPasswordError,
    deletingAccountStarted: store.deleteAccountReducer.deletingAccountStarted,
    deletingAccountResolved: store.deleteAccountReducer.deletingAccountResolved,
    deletingAccountError: store.deleteAccountReducer.deletingAccountError,
  };
})
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      formerPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      password: '',
      inputErrors: {
        passwordError: null,
        formerPasswordError: null,
        newPasswordError: null,
        confirmNewPasswordError: null,
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllEvents(this.props.userToken));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deletingAccountResolved) {
      this.props.dispatch(logOut());
      $('#delete-account-modal').modal('hide');
    }
  }

  componentWillUnmount() {
    this.props.dispatch(stopAsyncProcess(asyncProcess.CHANGING_PASSWORD));
    this.props.dispatch(stopAsyncProcess(asyncProcess.DELETING_ACCOUNT));
    $('#delete-account-modal').modal('hide');
    $('#change-password-modal').modal('hide');
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
   * It clears the inputs of the forms in the modals.
   */
  clearInputs = () => {
    const state = { ...this.state };
    state.formerPassword = '';
    state.newPassword = '';
    state.confirmNewPassword = '';
    state.password = '';
    this.setState(state);
  }

  /**
   * Clears all the inputErrors in the state.
   */
  clearInputErrors = () => {
    const state = { ...this.state };
    state.inputErrors = {
      passwordError: null,
      formerPasswordError: null,
      newPasswordError: null,
      confirmNewPasswordError: null,
    };
    this.setState(state);
  }

  /**
   * It stops the asynchronous process that might have being started.
   */
  killAsyncProcess = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.CHANGING_PASSWORD));
    this.props.dispatch(stopAsyncProcess(asyncProcess.DELETING_ACCOUNT));
  }

  /**
   * Perform some clean up actions when the modal is closed.
   */
  closeModalEffects = () => {
    this.clearInputs();
    setTimeout(() => {
      this.clearInputErrors();
    }, 1000);
    this.killAsyncProcess();
  }

  /**
   * It dispatches an action to change password.
   */
  changePassword = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.CHANGING_PASSWORD));
    const {
      formerPassword, newPassword, confirmNewPassword,
    } = this.state;
    const passwordDetials = {
      formerPassword, newPassword, confirmNewPassword,
    };
    const inputErrors = validateChangePasswordInputs(passwordDetials);
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      const { userToken } = this.props;
      this.props.dispatch(changePassword(passwordDetials, userToken));
    }
  }

  /**
   * It dispatches an action to delete the user's account.
   */
  deleteAccount = () => {
    this.props.dispatch(stopAsyncProcess(asyncProcess.DELETING_ACCOUNT));
    const { password } = this.state;
    const inputErrors = validateDeleteAccountInputs({ password });
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      const { userToken } = this.props;
      this.props.dispatch(deleteAccount(password, userToken));
    }
  }

  render() {
    return (
      <View
        userName={this.props.userName}
        events={this.props.events}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        changingPasswordStarted={this.props.changingPasswordStarted}
        changingPasswordError={this.props.changingPasswordError}
        changingPasswordResolved={this.props.changingPasswordResolved}
        deletingAccountStarted={this.props.deletingAccountStarted}
        deletingAccountError={this.props.deletingAccountError}
        formerPassword={this.state.formerPassword}
        newPassword={this.state.newPassword}
        confirmNewPassword={this.state.confirmNewPassword}
        password={this.state.password}
        inputErrors={this.state.inputErrors}
        getInput={this.getInput}
        closeModalEffects={this.closeModalEffects}
        deleteAccount={this.deleteAccount}
        changePassword={this.changePassword}
      />
    );
  }
}

Profile.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  events: [],
  changingPasswordStarted: false,
  changingPasswordResolved: false,
  changingPasswordError: '',
  deletingAccountStarted: false,
  deletingAccountResolved: false,
  deletingAccountError: '',
  dispatch: () => {},
};

/* eslint-disable react/forbid-prop-types */
Profile.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  events: PropTypes.array,
  changingPasswordStarted: PropTypes.bool,
  changingPasswordResolved: PropTypes.bool,
  changingPasswordError: PropTypes.string,
  deletingAccountStarted: PropTypes.bool,
  deletingAccountResolved: PropTypes.bool,
  deletingAccountError: PropTypes.string,
  dispatch: PropTypes.func,
};

export default Profile;
