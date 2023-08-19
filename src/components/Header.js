import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import ScrollLink from react-scroll
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo"></div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/experience">Experience</Link>
        <ScrollLink to="contact" smooth={true} offset={-70} duration={500}>Contact</ScrollLink>
      </nav>
    </header>
  );
};

export default Header;
