import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const defaultImage = '/images/defaultImgx4.jpeg';

const CenterDetailsModal = props => (
  <div className="modal fade" tabIndex="-1" role="dialog" id="center-details-modal">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-capitalize">{props.centerName}</h5>
          <button
            type="button"
            className="close no-outline-btn pointer-button"
            data-dismiss="modal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="center-image">
            <img src={props.centerImages ? props.centerImages[0] : defaultImage} alt="The Center" />
          </div>
          <div className="center-details">
            <p>{props.centerDetails}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

CenterDetailsModal.defaultProps = {
  centerName: '',
  centerDetails: '',
  centerImages: [defaultImage],
};

/* eslint-disable react/forbid-prop-types */
CenterDetailsModal.propTypes = {
  centerName: PropTypes.string,
  centerDetails: PropTypes.string,
  centerImages: PropTypes.array,
};

export default CenterDetailsModal;
