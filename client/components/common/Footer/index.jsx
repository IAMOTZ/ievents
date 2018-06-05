import React from 'react';

const footerStyle = {
  backgroundColor: 'rgba(0,0,0, 0.9)',
  borderTop: '2px solid rgb(0, 142, 214)'
};

const Footer = () => (
  <footer className="w-100 mt-auto" style={footerStyle}>
    <div className="container text-white text-center py-5">
      <h1>iEvents</h1>
      <p>Copyright &copy; 2017</p>
    </div>
  </footer>
);

export default Footer;
