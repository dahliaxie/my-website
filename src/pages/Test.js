import React, { useState, useEffect } from 'react';
import ASCIIAnimation from '../components/ASCIIAnimation';
import nature from '../videos/nature.mp4';

const Test = () => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [charsWidth, setCharsWidth] = useState(window.innerWidth - 20);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
      setCharsWidth(window.innerWidth - 20); // Adjust this value as needed
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="Test" style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <div className="ascii-container">
        <div className="ascii-body">
          <ASCIIAnimation videoPath={nature} fps={12} charsWidth={charsWidth} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Test;
