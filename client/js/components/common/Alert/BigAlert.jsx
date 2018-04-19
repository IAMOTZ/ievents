import React from 'react';
import PropTypes from 'prop-types';

const BigAlert = (props) => {
  const component = props.message ? (
    <div
      className={`alert text-center ${props.type === 'success' ? 'alert-success' : 'alert-danger'}`}
      role="alert"
    >{props.message}
    </div>
  ) : null;
  return component;
};

BigAlert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default BigAlert;

