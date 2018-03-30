import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import View from './View';

@connect(store => (
  {
    isUserAuthenticated: store.authReducer.loggingUserResolved,
  }
))
class Home extends React.Component {
  render() {
    if (this.props.isUserAuthenticated) {
      return <Redirect to="/addEvent" />;
    }
    return <View />;
  }
}

Home.defaultProps = {
  isUserAuthenticated: false,
};

Home.propTypes = {
  isUserAuthenticated: PropTypes.bool,
};

export default Home;
