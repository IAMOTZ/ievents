import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from './LoadingIcon';

const LoadingBox = props => (
  <div className="d-flex justify-content-center w-100 mt-3" style={{ minHeight: '300px' }} >
    <div style={{ marginTop: '100px' }}>
      <LoadingIcon start size={props.iconSize} />
    </div>
  </div>
);

LoadingBox.propTypes = {
  iconSize: PropTypes.number.isRequired,
};

export default LoadingBox;
