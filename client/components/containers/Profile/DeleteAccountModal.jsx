import React from 'react';
import PropTypes from 'prop-types';
import { BigAlert, SmallAlert } from '../../common/Alert';
import { LoadingIcon } from '../../common/LoadingAnimation';

const DeleteAccountModal = props => (
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
            onClick={props.closeModalEffects}
            disabled={props.deletingAccountStarted}
          ><span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p className="h6">Are you sure you wan&apos;t to delete your account? </p>
          <span className="text-grey">This action is irreversible, you would loose all your data on this platform.</span>
          <div className="form-group mt-3">
            <label htmlFor="password" className="h6">Your Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Input you password to continue"
              name="password"
              value={props.password}
              onChange={props.getInput}
            />
            <SmallAlert message={props.inputErrors.passwordError} />
            <LoadingIcon start={props.deletingAccountStarted} size={3} />
            <br />
            <BigAlert message={props.deletingAccountError} />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-dark pointer-button"
            data-dismiss="modal"
            onClick={props.closeModalEffects}
            disabled={props.deletingAccountStarted}
          >Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger pointer-button"
            onClick={props.deleteAccount}
            disabled={props.deletingAccountStarted}
          >Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

DeleteAccountModal.defaultProps = {
  deletingAccountError: '',
  inputErrors: {},
  password: '',
};

/* eslint-disable react/forbid-prop-types */
DeleteAccountModal.propTypes = {
  deletingAccountStarted: PropTypes.bool.isRequired,
  deletingAccountError: PropTypes.string,
  password: PropTypes.string,
  inputErrors: PropTypes.object,
  getInput: PropTypes.func.isRequired,
  closeModalEffects: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default DeleteAccountModal;
