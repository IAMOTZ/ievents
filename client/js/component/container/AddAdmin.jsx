import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateAddAdminInputs } from '../../helpers/inputValidators';
// Actions.
import { addAdmin, clearStatus } from '../../actions/authAction';
// Common components.
import UserSideNav from '../common/SideNavigation.jsx';
import Header from '../common/Header.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import { LoadingIcon } from '../common/LoadingAnimation.jsx';
import { BigAlert, SmallAlert } from '../common/Alert.jsx';

@connect(store => (
  {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    isAdmin: (store.user.user.role === 'admin'),
    isSuperAdmin: (store.user.user.role === 'superAdmin'),
    status: {
      adding: store.user.status.addingAdmin,
      success: store.user.status.adminAdded,
      error: store.user.status.addingAdminError,
    },
  }
))
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

  /**
   * Update some state variables with the user inputs.
   * @param {Event} e The event object.
   */
  getInput = (e) => {
    if (this.props.status.success) {
      this.refresh();
    }
    const state = { ...this.state };
    state[e.target.name] = e.target.value;
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
   * Refresh the page by clearing all created info in the store
   */
  refresh() {
    this.props.dispatch(clearStatus('ADD_ADMIN'));
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
    let component;
    if (!this.props.authenticated) {
      component = (<Redirect to="/users/login" />);
    } else {
      component = (
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
                  <LoadingIcon start={this.props.status.adding} size={3} />
                  <div className="card align-items-center text-center w-75">
                    <div className="card-body">
                      <BigAlert message={this.props.status.error.message} />
                      {
                        this.props.status.success ?
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
                        className="btn btn-primary"
                        disabled={this.props.status.adding}
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
    return component;
  }
}

export default AddAdmin;
