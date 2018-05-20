import React from 'react';
import PropTypes from 'prop-types';

const EventStatus = (props) => {
  switch (props.status) {
    case ('canceled'): {
      return (
        <div className="card-footer text-danger text-center">
          <i className="fa fa-times-circle" />&nbsp;
          <span>Canceled</span>
        </div>
      );
    }
    case ('done'): {
      return (
        <div className="card-footer text-info text-center">
          <i className="fa fa-exclamation" />&nbsp;
          <span>Done</span>
        </div>
      );
    }
    default: {
      return (
        <div className="card-footer text-success text-center">
          <i className="fa fa-check" />&nbsp;
          <span>Allowed</span>
        </div>
      );
    }
  }
};

EventStatus.defaultProps = {
  status: null,
};
EventStatus.propTypes = {
  status: PropTypes.string,
};
export default EventStatus;
