import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RequireAuthentication = (Component, props = {}) => {
  @connect(store => ({
    isUserAuthenticated: store.authReducer.loggingUserResolved,
  }))
  class Authenticate extends React.Component {
    render() {
      if (this.props.isUserAuthenticated) {
        return <Component {...props} />;
      }
      return <Redirect to="/users/login" />;
    }
  }

  Authenticate.defaultProps = {
    isUserAuthenticated: false,
  };

  Authenticate.propTypes = {
    isUserAuthenticated: PropTypes.bool,
  };
  return Authenticate;
};

export default RequireAuthentication;
