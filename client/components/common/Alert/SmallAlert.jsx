import React from 'react';
import PropTypes from 'prop-types';

const SmallAlert = (props) => {
  const component = props.message ? (
    <span className="text-danger text-center small">{props.message}</span>
  ) : null;
  return component;
};

SmallAlert.propTypes = {
  message: PropTypes.string,
};

export default SmallAlert;
