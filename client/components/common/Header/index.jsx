import React from 'react';
import PropTypes from 'prop-types';

const headerStyle = {
  backgroundColor: 'rgba(0,0,0, 0.9)'
};

const Header = props => (
  <nav className="navbar w-100 mt-3 d-none d-lg-block" style={headerStyle} id="header">
    <strong className="navbar-brand text-white">{props.text}</strong>
  </nav>
);

Header.defaultProps = {
  text: null,
};
Header.propTypes = {
  text: PropTypes.string,
};

export default Header;
