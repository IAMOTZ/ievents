import React from 'react';
import PropTypes from 'prop-types';
import { BigAlert, SmallAlert } from '../../common/Alert';
import { LoadingIcon } from '../../common/LoadingAnimation';

const ChangePasswordModal = props => (
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
            onClick={props.closeModalEffects}
            disabled={props.changingPasswordStarted}
          ><span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <LoadingIcon start={props.changingPasswordStarted} size={3} />
          <BigAlert message={props.changingPasswordError} />
          <BigAlert
            message={props.changingPasswordResolved ? 'Password Changed!!' : null}
            type="success"
          />
          <form className="mt-0">
            <div className="form-group">
              <label htmlFor="former-password">Former Password</label>
              <input
                type="password"
                className="form-control"
                id="former-password"
                name="formerPassword"
                value={props.formerPassword}
                onChange={props.getInput}
              />
              <SmallAlert message={props.inputErrors.formerPasswordError} />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                className="form-control"
                id="new-password"
                name="newPassword"
                value={props.newPassword}
                onChange={props.getInput}
              />
              <SmallAlert message={props.inputErrors.newPasswordError} />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-new-password">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm-new-password"
                name="confirmNewPassword"
                value={props.confirmNewPassword}
                onChange={props.getInput}
              />
              <SmallAlert message={props.inputErrors.confirmNewPasswordError} />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-dark pointer-button"
            data-dismiss="modal"
            onClick={props.closeModalEffects}
            disabled={props.changingPasswordStarted}
          >Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary pointer-button"
            onClick={props.changePassword}
            disabled={props.changingPasswordStarted}
          >Change
          </button>
        </div>
      </div>
    </div>
  </div>
);

ChangePasswordModal.defaultProps = {
  changingPasswordError: '',
  inputErrors: {},
};

/* eslint-disable react/forbid-prop-types */
ChangePasswordModal.propTypes = {
  changingPasswordStarted: PropTypes.bool.isRequired,
  changingPasswordError: PropTypes.string,
  changingPasswordResolved: PropTypes.bool.isRequired,
  formerPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  confirmNewPassword: PropTypes.string.isRequired,
  inputErrors: PropTypes.object,
  getInput: PropTypes.func.isRequired,
  closeModalEffects: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
