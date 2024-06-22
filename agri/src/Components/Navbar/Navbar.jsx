import React from 'react';
import './Navbar.css'
import logo from '../../assets/agrisense-high-resolution-logo-black-transparent.png'
import { Link } from 'react-router-dom';
  const Navbar = () => {
  return (
<div>
      <div className='nav'>
        <div className='nav-logo'><img className='logo' src={ logo} alt=''/></div>
      <ul className='nav-menu'>
        <Link to="/agrisense" className='nav-contact'>Home</Link>
        <Link to="/login" className='nav-contact'>Login</Link>
        <Link to="/signup" className='nav-contact'>Register</Link>
        <Link to="/explore" className='nav-contact'>Explore</Link>
        <Link to="/about" className='nav-contact'>About</Link>
        <Link to="/contact" className='nav-contact'>Contact</Link>
      
      </ul>
      </div>
      </div>
  )
  }
export default Navbar;
