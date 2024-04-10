import React, { useState, useEffect } from 'react';
import '../styles/ExperienceItem.css'; // Adjust the path as needed

const ExperienceItem = ({ company, website, text }) => {
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(false);

  const typingSpeed = 100; // Adjust typing speed in milliseconds

  useEffect(() => {
    let index = 0;
    let currentText = '';

    const type = () => {
      currentText = text.substring(0, index + 1);
      setTypedText(currentText);
      index++;
      if (index > text.length) {
        clearInterval(intervalId);
        setCursorVisible(true);
      }
    };

    const intervalId = setInterval(type, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text]); // Dependency array ensures typing restarts for new text

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prevVisible) => !prevVisible);
    }, 500); // Adjust blinking speed in milliseconds

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="experience-item">
      <h3>{company}</h3>
      {website && (
        <a href={website} target="_blank" rel="noreferrer">
          {company}
        </a>
      )}
      <p className="experience-text">
        {typedText}
        <span className={`cursor ${cursorVisible ? 'visible' : 'hidden'}`}>|</span>
      </p>
    </div>
  );
};

export default ExperienceItem;
