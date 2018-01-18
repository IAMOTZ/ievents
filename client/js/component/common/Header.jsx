import React from 'react';

const Header = props => (
  <nav className="navbar w-100 mt-3 d-none d-lg-block">
    <a className="navbar-brand text-white">
      <strong>{props.text}</strong>
    </a>
  </nav>
);

export default Header;
