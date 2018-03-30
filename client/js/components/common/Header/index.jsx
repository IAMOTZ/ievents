import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <nav className="navbar w-100 mt-3 d-none d-lg-block">
    <a className="navbar-brand text-white">
      <strong>{props.text}</strong>
    </a>
  </nav>
);

Header.defaultProps = {
  text: null,
};
Header.propTypes = {
  text: PropTypes.string,
};

export default Header;
