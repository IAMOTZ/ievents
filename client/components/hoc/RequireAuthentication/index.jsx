import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

@connect(store => ({
  isUserAuthenticated: store.authReducer.loggingUserResolved,
}))
class RequireAuthentication extends React.Component {
  render() {
    if (this.props.isUserAuthenticated) {
      return this.props.children;
    }
    return <Redirect to="/users/login" />;
  }
}

RequireAuthentication.propTypes = {
  isUserAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

RequireAuthentication.defaultProps = {
  isUserAuthenticated: false,
  children: null,
};

export default RequireAuthentication;
