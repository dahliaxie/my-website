import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/TestingPage.css';

const asciiImages = [
    {
      label: 'penguin',
      link: '/page1',
      art: `
          __
       -=(o '.
          '.-.\\
          /|  \\
          '|  ||
           _\\_):,_
  `,
    },
    {
      label: 'faerie',
      link: '/page2',
      art: `
.'.         .'.
|  \\       /  |
'.  \\  |  /  .'
  '. \\\\|// .'
    '-- --'
    .'/|\\'.
   '..'|'..'
  `,
    },
    {
      label: 'Image 3',
      link: '/page3',
      art: `            
   +
   A_
  /\\-\\
 _||"|_
~^~^~^~^
  `,
    },
    {
      label: 'cat',
      link: '/page4',
      art: `
         /\\_/\\  
        ( o.o ) 
         > ^ <  
  `,
    },
    {
      label: 'bunnt',
      link: '/page5',
      art: `
        (\\__/)
        (='.'=)
        (")_(")
  `,
    },
    { 
      label: 'love',
      link: '/page6',
      art: `
           x
.-. _______|
|=|/     /  \\
| |_____|_""_|
|_|_[X]_|____|
  `
    }
  ];
  

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TestingPage() {
  const [text, setText] = useState('');
  const [currentChar, setCurrentChar] = useState(0);
  const [asciiInstances, setAsciiInstances] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [isMovementEnabled, setIsMovementEnabled] = useState(true); // State to control movement

  const typingSpeed = 100; // Adjusted typing speed (milliseconds)

  const lines = [
    'unplug the servers, let the algorithm rest',
    'purify my heart, sanctify this eternal waste',
    'as my heart pumps blood through my body..',
    '..i waste time on vacant thoughts',
    'a barrier to my reality',
    'my eyes close slow as a meditative breath'
  ];

  useEffect(() => {
    let typewriterTimeout;

    const typeWriter = () => {
      if (currentChar < text.length) {
        setCurrentChar(currentChar + 1);
        typewriterTimeout = setTimeout(typeWriter, typingSpeed);
      } else {
        typewriterTimeout = setTimeout(() => {
          setLineIndex((prev) => (prev + 1) % lines.length);
          setText(lines[(lineIndex + 1) % lines.length]);
          setCurrentChar(0);
        }, 1500); // Adjust pause time (milliseconds) before next line
      }
    };

    // Start typing immediately
    typewriterTimeout = setTimeout(typeWriter, typingSpeed);

    // Clear timeout on unmount and reset
    return () => clearTimeout(typewriterTimeout);
  }, [currentChar, lineIndex, lines]);

  useEffect(() => {
    if (isMovementEnabled) {
      const interval = setInterval(() => {
        const newAsciiInstance = {
          ...asciiImages[getRandomInt(0, asciiImages.length - 1)],
          top: getRandomInt(50, window.innerHeight-200), // Random y position within the viewport
        };
        setAsciiInstances((prev) => [...prev, newAsciiInstance]);
      }, 2000); // Adjust appearance interval (milliseconds)

      // Clear interval on unmount
      return () => clearInterval(interval);
    }
  }, [isMovementEnabled]);

  const toggleMovement = () => {
    setIsMovementEnabled(!isMovementEnabled);
  };


  return (
    <div className="TestingPage">
      {asciiInstances.map((instance, index) => (
        <div
          className="ascii-box"
          style={{
            top: `${instance.top}px`,
            animationDelay: `${index * 2}s`,
            animationPlayState: instance.isPaused || !isMovementEnabled ? 'paused' : 'running',
          }}
          key={index}
        >
          <AsciiImage image={instance} />
        </div>
      ))}
      <div className="caption-box">
        <div className="caption-container">
          <p>{text.substring(0, currentChar)}</p>
        </div>
      </div>
      <div className="toggle-button">
        <button onClick={toggleMovement}>
          {isMovementEnabled ? 'Pause Movement' : 'Resume Movement'}
        </button>
      </div>
    </div>
  );
}


function AsciiImage({ image }) {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(image.link); // Redirect to image.link when clicked
    };
  
    return (
      <div className="ascii-image" onClick={handleClick}>
        <h3>{image.label}</h3>
        <pre>{image.art}</pre>
      </div>
    );
  }
  

export default TestingPage;
