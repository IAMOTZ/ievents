import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validateAddAdminInputs } from '../../../helpers/inputValidators';
import { addAdmin } from '../../../actions/userActions';
import { stopAsyncProcess } from '../../../actions/commonActions';
import * as asyncProcess from '../../../actions/asyncProcess';
import View from './View';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    userName: user.name,
    userToken: user.token,
    isAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isSuperAdmin: user.role === 'superAdmin',
    addingAdminStarted: store.addAdminReducer.addingAdminStarted,
    addingAdminResolved: store.addAdminReducer.addingAdminResolved,
    addingAdminError: store.addAdminReducer.addingAdminError,
  };
})
class AddAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      inputErrors: {
        emailError: null,
      },
    };
  }

  componentWillUnmount() {
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_ADMIN));
  }

  /**
   * Stores the user inputs in the state of this component.
   * @param {Event} event The event object.
   */
  getInput = (event) => {
    if (this.props.addingAdminResolved || this.props.addingAdminError) {
      this.refresh();
    }
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
      emailError: null,
    };
    this.setState(state);
  }

  /**
   * Refresh the page by stopping any asynchronous process that might be going on.
   */
  refresh() {
    this.props.dispatch(stopAsyncProcess(asyncProcess.ADDING_ADMIN));
  }

  /**
   * Dispatches the action to add the admin.
   */
  add = () => {
    const { email } = this.state;
    const inputErrors = validateAddAdminInputs({ email });
    if (inputErrors.errorFound) {
      const state = { ...this.state };
      state.inputErrors = inputErrors;
      this.setState(state);
    } else {
      this.clearInputErrors();
      this.props.dispatch(addAdmin(this.state.email, this.props.userToken));
    }
  }

  render() {
    return (
      <View
        userName={this.props.userName}
        isAdmin={this.props.isAdmin}
        isSuperAdmin={this.props.isSuperAdmin}
        dispatch={this.props.dispatch}
        addingAdminStarted={this.props.addingAdminStarted}
        addingAdminError={this.props.addingAdminError}
        addingAdminResolved={this.props.addingAdminResolved}
        newAdmin={this.state.email}
        getInput={this.getInput}
        inputErrors={this.state.inputErrors}
        add={this.add}
      />
    );
  }
}

AddAdmin.defaultProps = {
  userName: '',
  userToken: '',
  isAdmin: false,
  isSuperAdmin: false,
  addingAdminStarted: false,
  addingAdminResolved: false,
  addingAdminError: '',
  dispatch: () => {},
};

AddAdmin.propTypes = {
  userName: PropTypes.string,
  userToken: PropTypes.string,
  isAdmin: PropTypes.bool,
  isSuperAdmin: PropTypes.bool,
  addingAdminStarted: PropTypes.bool,
  addingAdminResolved: PropTypes.bool,
  addingAdminError: PropTypes.string,
  dispatch: PropTypes.func,
};

export default AddAdmin;
