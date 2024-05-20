import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = currentScrollPos <= 0 || prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    }; 

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={`header ${visible ? 'visible' : 'hidden'}`}>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="contact-button">
        <Link to="/contact" className="button">Contact</Link> {/* Add className "button" */}
      </div>
    </header>
  );
};

export default Header;
