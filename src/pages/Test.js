import React, { useState, useEffect, useCallback } from 'react';
import ASCIIAnimation from '../components/ASCIIAnimation';
import nature from '../videos/nature.mp4';

const Test = () => {
  const [charsWidth, setCharsWidth] = useState(window.innerWidth - 20);

  // Function to handle resize events
  const handleResize = useCallback(() => {
    setCharsWidth(window.innerWidth - 20); // Adjust this value as needed
  }, []);

  // Effect to add resize event listener on component mount
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]); // Dependency array ensures that handleResize is recreated only when needed

  return (
    <div className="Test" style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <div className="ascii-container">
        <div className="ascii-body">
          <ASCIIAnimation videoPath={nature} fps={8} charsWidth={charsWidth} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Test;
