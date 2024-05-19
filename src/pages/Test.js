import React, { useState, useEffect } from 'react';
import ASCIIAnimation from '../components/ASCIIAnimation';
import eye3 from '../videos/eye3.mp4';
import nature from '../videos/nature.mp4';
import cloud from '../videos/cloud.mp4';
import meme from '../videos/meme.mp4'

const Test = () => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth); // Initialize with the initial width of the page
  const [charsWidth, setCharsWidth] = useState(window.innerWidth - 20); // Adjust this value as needed
  useEffect(() => {
    // Function to update pageWidth when the window is resized
    const handleResize = () => {
      setPageWidth(window.innerWidth);
      setCharsWidth(window.innerWidth - 20); // Adjust this value as needed
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Only run this effect once on mount

  return (
    <div className="Test" style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <ASCIIAnimation videoPath={nature} fps={12} charsWidth={400} color="white" />
    </div>
  );
};

export default Test;
