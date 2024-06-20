import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import '../styles/Wip.css';

const Wip = ({ message = 'work in progress...' }) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const blinkingInterval = setInterval(() => {
      setShowCursor(prevState => !prevState);
    }, 500); // Blinking speed in milliseconds

    return () => clearInterval(blinkingInterval);
  }, []); // Only run effect on component mount

  return (
    <div className="wip-container">
      <p className="wip-text">{message}<span style={{ visibility: showCursor ? 'visible' : 'hidden' }}>|</span></p>
      <div className="buttons-container">
      <Link to="/v0" className="wip-button">v0</Link>
        <Link to="/v1" className="wip-button">v1</Link>
      </div>
    </div>
  );
};

export default Wip;
