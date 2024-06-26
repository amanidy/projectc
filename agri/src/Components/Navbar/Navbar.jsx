import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
  const Navbar = () => {
  return (
<div>
      <div className='nav'>
        <h2>AGRISENSE</h2>
        
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
