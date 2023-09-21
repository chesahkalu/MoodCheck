import React from 'react';
import logo from './logo.png';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary sticky-top">
      <div className="container-fluid mt-3 ml-4">
          <img src={logo} alt="MoodCheck Logo" width="200" height="60" />
      </div>
    </nav>
  );
}

export default Navbar;
