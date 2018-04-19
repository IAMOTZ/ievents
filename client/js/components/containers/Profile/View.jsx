import React from 'react';
import PropTypes from 'prop-types';
import SideNavigation from '../../common/SideNavigation';
import { AuthTopNavigation } from '../../common/TopNavigation';
import Header from '../../common/Header';
import { countCollection } from '../../../helpers/helpers';
import ChangePasswordModal from './ChangePasswordModal';
import DeleteAccountModal from './DeleteAccountModal';

const View = props => (
  <div id="profile-container">

    {/* Top Navigation on small and medium screens */}
    <AuthTopNavigation
      name={props.userName}
      title="Profile"
      isAdmin={props.isAdmin}
      isSuperAdmin={props.isSuperAdmin}
      dispatch={props.dispatch}
    />

    <div className="container-fluid">
      <div className="row">

        {/* Side navigation on large sreen */}
        <SideNavigation
          name={props.userName}
          isAdmin={props.isAdmin}
          isSuperAdmin={props.isSuperAdmin}
          dispatch={props.dispatch}
        />

        {/* <!-- Main content --> */}
        <div className="col-lg-10 offset-lg-2">

          {/* Content Header(navigation) on large screen */}
          <Header text="Profile" />

          {/* <!-- Profile Detials --> */}
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '500px', marginTop: '70px' }} id="content">
            <div className="bg-white p-3" style={{ width: '500px' }}>
              <p className="h1 text-center text-capitalize" style={{ fontWeight: 'lighter', fontSize: '3rem' }}>{props.userName}</p>
              <p className="h3 mt-3" style={{ fontWeight: 'normal' }}>Events</p>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center text-grey">
                  Done
                  <span className="badge badge-primary badge-pill">
                    {countCollection(props.events, event => event.status === 'done')}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center text-grey">
                  Allowed
                  <span className="badge badge-primary badge-pill">
                    {countCollection(props.events, event => event.status === 'allowed')}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center text-grey">
                  Canceled
                  <span className="badge badge-primary badge-pill">
                    {countCollection(props.events, event => event.status === 'canceled')}
                  </span>
                </li>
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

          <ChangePasswordModal
            changingPasswordStarted={props.changingPasswordStarted}
            changingPasswordError={props.changingPasswordError}
            changingPasswordResolved={props.changingPasswordResolved}
            formerPassword={props.formerPassword}
            newPassword={props.newPassword}
            confirmNewPassword={props.confirmNewPassword}
            inputErrors={props.inputErrors}
            getInput={props.getInput}
            closeModalEffects={props.closeModalEffects}
            changePassword={props.changePassword}
          />

          <DeleteAccountModal
            deletingAccountStarted={props.deletingAccountStarted}
            deletingAccountError={props.deletingAccountError}
            password={props.password}
            inputErrors={props.inputErrors}
            getInput={props.getInput}
            closeModalEffects={props.closeModalEffects}
            deleteAccount={props.deleteAccount}
          />

        </div>
      </div>
    </div>
  </div>
);

View.defaultProps = {
  changingPasswordError: '',
  deletingAccountError: '',
  formerPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  password: '',
  inputErrors: {},
};

/* eslint-disable react/forbid-prop-types */
View.propTypes = {
  userName: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  changingPasswordStarted: PropTypes.bool.isRequired,
  changingPasswordError: PropTypes.string,
  changingPasswordResolved: PropTypes.bool.isRequired,
  deletingAccountStarted: PropTypes.bool.isRequired,
  deletingAccountError: PropTypes.string,
  formerPassword: PropTypes.string,
  newPassword: PropTypes.string,
  confirmNewPassword: PropTypes.string,
  password: PropTypes.string,
  inputErrors: PropTypes.object,
  getInput: PropTypes.func.isRequired,
  closeModalEffects: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default View;
