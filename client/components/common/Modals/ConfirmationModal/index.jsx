import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = props => (
  <div className="modal fade" tabIndex="-1" role="dialog" id="confirmation-modal">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirmation</h5>
          <button
            type="button"
            className="close pointer-button"
            data-dismiss="modal"
            onClick={props.onCancel}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn ie-dark-button"
            data-dismiss="modal"
            onClick={props.onCancel}
          >
            No
          </button>
          <button
            type="button"
            className="btn btn-primary pointer-button"
            onClick={props.onOK}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
);

ConfirmationModal.defaultProps = {
  children: null,
};
ConfirmationModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onOK: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ConfirmationModal;
