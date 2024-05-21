import React, { useState, useEffect } from 'react';
import '../styles/Wip.css'

const Wip = ({ message = 'Work in Progress...' }) => {
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
    </div>
  );
};

export default Wip;
