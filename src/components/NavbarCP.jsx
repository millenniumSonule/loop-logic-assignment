import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import './NavbarCP.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-cp">CONTACT</div>
      <ul className="navbar-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
          >
            VIDEO GAMES
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/ContactPage" 
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
          >
            CONTACT
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/AddGame" 
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
          >
            Add Game
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
