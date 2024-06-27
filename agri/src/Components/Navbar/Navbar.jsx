import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoIcon from '../../assets/logo-icon.svg'; // Import your logo icon

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <img src={ logoIcon} alt='' className='logo-icon'/>
        <h2 className='navbar-logo' >AGRISENSE</h2>
        <ul className='navbar-menu'>
          <li className='navbar-item'>
            <Link to="/agrisense" className='navbar-link'><i className='fas fa-home'></i> Home</Link>
          </li>
          <li className='navbar-item'>
            <Link to="/login" className='navbar-link'><i className='fas fa-sign-in-alt'></i> Login</Link>
          </li>
          <li className='navbar-item'>
            <Link to="/signup" className='navbar-link'><i className='fas fa-user-plus'></i> Register</Link>
          </li>
          <li className='navbar-item'>
            <Link to="/explore" className='navbar-link'><i className='fas fa-compass'></i> Explore</Link>
          </li>
          <li className='navbar-item'>
            <Link to="/about" className='navbar-link'><i className='fas fa-info-circle'></i> About</Link>
          </li>
          <li className='navbar-item'>
            <Link to="/contact" className='navbar-link'><i className='fas fa-phone'></i> Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
