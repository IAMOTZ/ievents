import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateAddAdminInputs } from '../../helpers/inputValidators';
import { addAdmin } from '../../actions/authAction';
import { stopAsyncProcess } from '../../actions/commonActions';
import * as asyncProcess from '../../actions/asyncProcess';
import UserSideNav from '../common/SideNavigation';
import Header from '../common/Header';
import { UserTopNav } from '../common/TopNavigation';
import { LoadingIcon } from '../common/LoadingAnimation';
import { BigAlert, SmallAlert } from '../common/Alert';

@connect((store) => {
  const { user } = store.authReducer;
  return {
    user,
    isAdmin: user.role === 'admin',
    isSuperAdmin: user.role === 'admin' || user.role === 'superAdmin',
    isUserAuthenticaed: store.authReducer.loggingUserResolved,
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
      this.props.dispatch(addAdmin(this.state.email, this.props.user.token));
    }
  }

  render() {
    if (!this.props.isUserAuthenticaed) {
      return (<Redirect to="/users/login" />);
    }
    return (
      <div id="add-admin-container">
        {/* Top navigation on small screen */}
        <UserTopNav
          name={this.props.user.name}
          title="Add an admin"
          isAdmin={this.props.isAdmin}
          isSuperAdmin={this.props.isSuperAdmin}
          dispatch={this.props.dispatch}
        />
        <div className="container-fluid">
          <div className="row">
            {/*  Side navigation on large screen */}
            <UserSideNav
              name={this.props.user.name}
              isAdmin={this.props.isAdmin}
              isSuperAdmin={this.props.isSuperAdmin}
              dispatch={this.props.dispatch}
            />
            {/* Main content */}
            <div className="col-lg-10 offset-md-2 mt-lg-0" id="main-content">
              {/* Content Header(navigation) on large screen */}
              <Header text="Add an admin" />
              <div className="d-flex flex-column align-items-center mt-5">
                <LoadingIcon start={this.props.addingAdminStarted} size={3} />
                <div className="card align-items-center text-center w-75">
                  <div className="card-body">
                    <BigAlert message={this.props.addingAdminError} />
                    {
                      this.props.addingAdminResolved ?
                        <BigAlert
                          message={`${this.state.email} is now an admin`}
                          type="success"
                        /> : null
                    }
                    <div className="input-group px-3">
                      <span className="input-group-addon">
                        <i className="fa fa-user" />
                      </span>
                      <input
                        id="input-email"
                        type="text"
                        className="form-control"
                        placeholder="The user's email"
                        name="email"
                        onChange={this.getInput}
                      />
                    </div>
                    <SmallAlert message={this.state.inputErrors.emailError} />
                    <ul className="text-left mt-2 text-muted">
                      <li>The user must have signed up already</li>
                      <li>If successful, the user would have access to:
                          <ol type="number">
                          <li>Creating a Center</li>
                          <li>Editing a Center</li>
                          <li>Viewing transactions</li>
                          <li>Making decisions on transactions</li>
                        </ol>
                      </li>
                    </ul>
                    <button
                      id="add-btn"
                      className="btn btn-primary pointer-button"
                      disabled={this.props.addingAdminStarted}
                      onClick={this.add}
                    >Add Admin
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="d-block d-sm-none mt-5">
          <div className="container text-white text-center py-5">
            <h1>Ievents</h1>
            <p>Copyright &copy; 2017</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default AddAdmin;
