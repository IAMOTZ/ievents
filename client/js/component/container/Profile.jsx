/* global $ */
/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions.
import {
  changePassword, deleteUser, clearStatus, clearUser,
} from '../../actions/authAction';
import { getAllEvents } from '../../actions/eventActions';
// Common components.
import UserSideNav from '../common/SideNavigation.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';
import Header from '../common/Header.jsx';
import { LoadingIcon } from '../common/LoadingAnimation.jsx';
import { SuccessAlert, WarningAlert } from '../common/Alert.jsx';
// Helpers
import countCollections from '../../helpers/counter';

@connect(store => (
  {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    isAdmin: (store.user.user.role === 'admin'),
    isSuperAdmin: (store.user.user.role === 'superAdmin'),
    events: store.events.events,
    status: {
      changingPassword: store.user.status.changingPassword,
      changingPasswordResolved: store.user.status.changingPasswordResolved,
      changingPasswordRejected: store.user.status.changingPasswordRejected,
      deletingUser: store.user.status.deletingUser,
      deletingUserResolved: store.user.status.deletingUserResolved,
      deletingUserRejected: store.user.status.deletingUserRejected,
    },
  }
))
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      formerPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllEvents(this.props.user.token));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status.deletingUserResolved) {
      this.props.dispatch(clearUser());
      $('#delete-account-modal').modal('hide');
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearStatus('CHANGING_PASSWORD'));
    this.props.dispatch(clearStatus('DELETING_USER'));
  }

  /**
   * Gets user inputs and update the component's state with it.
   * @param {Event} e The event object.
   */
  getInput = (e) => {
    const state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  /**
   * It dispatches an action to change password.
   */
  changePassword = () => {
    const {
      formerPassword, newPassword, confirmNewPassword,
    } = this.state;
    const passwordDetials = {
      formerPassword, newPassword, confirmNewPassword,
    };
    const userToken = this.props.user.token;
    this.props.dispatch(changePassword(passwordDetials, userToken));
  }

  /**
   * It dispatches an action to delete the user's account.
   */
  deleteUser = () => {
    const { password } = this.state;
    const userToken = this.props.user.token;
    this.props.dispatch(deleteUser(password, userToken));
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
   * It clears all the status in the state relating to changing password.
   */
  clearStateStatus = () => {
    this.props.dispatch(clearStatus('CHANGING_PASSWORD'));
    this.props.dispatch(clearStatus('DELETING_USER'));
  }

  /**
   * Perform some actions when the modal is closed.
   */
  closeModalEffects = () => {
    this.clearInputs();
    this.clearStateStatus();
  }

  render() {
    let component;
    if (!this.props.authenticated) {
      component = <Redirect to="/users/login" />;
    } else {
      component = (
        <div id="profile-container">

          {/* Top Navigation on small and medium screens */}
          <UserTopNav
            name={this.props.user.name}
            title="Profile"
            isAdmin={this.props.isAdmin}
            isSuperAdmin={this.props.isSuperAdmin}
            dispatch={this.props.dispatch}
          />

          <div className="container-fluid">
            <div className="row">

              {/* Side navigation on large sreen */}
              <UserSideNav
                name={this.props.user.name}
                isAdmin={this.props.isAdmin}
                isSuperAdmin={this.props.isSuperAdmin}
                dispatch={this.props.dispatch}
              />

              {/* <!-- Main content --> */}
              <div className="col-lg-10 offset-lg-2">

                {/* Content Header(navigation) on large screen */}
                <Header text="Profile" />

                {/* <!-- Profile Detials --> */}
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '500px', marginTop: '70px' }} id="content">
                  <div className="bg-white p-3" style={{ width: '500px' }}>
                    <p className="h1 text-center text-capitalize" style={{ fontWeight: 'lighter', fontSize: '3rem' }}>{this.props.user.name}</p>
                    <p className="h3 mt-3" style={{ fontWeight: 'normal' }}>Events</p>
                    <ul className="list-group">
                      <Link to='/events' className="just-link">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-grey">
                          Done
                          <span className="badge badge-primary badge-pill">
                            {countCollections(this.props.events, event => event.status === 'done')}
                          </span>
                        </li>
                      </Link>
                      <Link to='/events' className="just-link">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-grey">
                          Pending
                          <span className="badge badge-primary badge-pill">
                            {countCollections(this.props.events, event => event.status === 'allowed')}
                          </span>
                        </li>
                      </Link>
                      <Link to='/events' className="just-link">
                        <li className="list-group-item d-flex justify-content-between align-items-center text-grey">
                          Canceled
                          <span className="badge badge-primary badge-pill">
                            {countCollections(this.props.events, event => event.status === 'canceled')}
                          </span>
                        </li>
                      </Link>
                    </ul>
                    <p className="h3 mt-3" style={{ fontWeight: 'normal' }}>Account Settings</p>
                    <ul className="list-group">
                      <a href="" className="just-link" data-toggle="modal" data-target="#change-password-modal">
                        <li className="list-group-item">Change Password</li>
                      </a>
                      <a href="" className="just-link" data-toggle="modal" data-target="#delete-account-modal">
                        <li className="list-group-item">Delete Account</li>
                      </a>
                    </ul>
                  </div>
                </div>
                {/* <!-- /.Profile Details --> */}

                {/* <!-- Change Password Modal --> */}
                <div className="modal fade" id="change-password-modal" tabIndex="-1" role="dialog" data-backdrop="static">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Change Password</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={this.closeModalEffects}
                          disabled={this.props.status.changingPassword}
                        ><span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <LoadingIcon start={this.props.status.changingPassword} size={3} />
                        <WarningAlert message={this.props.status.changingPasswordRejected.message} />
                        <SuccessAlert
                          message={this.props.status.changingPasswordResolved ? 'Password Changed!!' : null}
                        />
                        <form className="mt-0">
                          <div className="form-group">
                            <label htmlFor="former-password">Former Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="former-password"
                              name="formerPassword"
                              value={this.state.formerPassword}
                              onChange={this.getInput}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="new-password">New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="new-password"
                              name="newPassword"
                              value={this.state.newPassword}
                              onChange={this.getInput}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="confirm-new-password">Confirm New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirm-new-password"
                              name="confirmNewPassword"
                              value={this.state.confirmNewPassword}
                              onChange={this.getInput}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-dark"
                          data-dismiss="modal"
                          onClick={this.closeModalEffects}
                          disabled={this.props.status.changingPassword}
                        >Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.changePassword}
                          disabled={this.props.status.changingPassword}
                        >Change
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /.Change Password Modal --> */}

                {/* <!-- Delete Account Modal --> */}
                <div className="modal fade" id="delete-account-modal" tabIndex="-1" role="dialog" data-backdrop="static">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Delete Account</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={this.closeModalEffects}
                          disabled={this.props.status.deletingUser}
                        ><span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p className="h6">Are you sure you wan't to delete your account? </p>
                        <span className="text-grey">This action is irreversible, you would loose all your data on this platform.</span>
                        <div className="form-group mt-3">
                          <label htmlFor="password" className="h6">Your Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Input you password to continue"
                            name="password"
                            value={this.state.password}
                            onChange={this.getInput}
                          />
                          <LoadingIcon start={this.props.status.deletingUser} size={3} />
                          <WarningAlert message={this.props.status.deletingUserRejected.message} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-dark"
                          data-dismiss="modal"
                          onClick={this.closeModalEffects}
                          disabled={this.props.status.deletingUser}
                        >Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={this.deleteUser}
                          disabled={this.props.status.deletingUser}
                        >Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /.Delete Account Modal --> */}

              </div>
            </div>
          </div>
        </div>
      );
    }
    return component;
  }
}

export default Profile;
