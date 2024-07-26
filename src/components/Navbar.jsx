import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">VIDEO</div>
      <div className="navbar-links">
        <a href="#video-games">VIDEO GAMES</a>
        <a href="#contact">CONTACT</a>
      </div>

    </nav>
  );
};

export default Navbar;
