import React, { useEffect, useState } from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const name = 'Dahlia Xie';
  const sentence = 'is a Software Engineer based out of Seattle, Washington.';
  const typingSpeed = 100; // Typing speed in milliseconds

  useEffect(() => {
    let index = 0;
    let currentText = '';
 
    const type = () => {
      currentText = sentence.substring(0, index + 1);
      setText(currentText);
      index++;
      if (index > sentence.length) {
        clearInterval(intervalId);
        setShowCursor(true);
      }
    };

    const intervalId = setInterval(type, typingSpeed);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prevState => !prevState);
    }, 500); // Blinking speed in milliseconds

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="hero-section">
      <h1 className="headline">
        <span className="name">{name}</span> {text}
        <span style={{ visibility: showCursor ? 'visible' : 'hidden' }}>|</span>
      </h1>
    </section>
  );
};

export default HeroSection;
