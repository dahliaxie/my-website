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
    label: 'church',
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
    label: 'bunny',
    link: '/page5',
    art: `
        (\\__/)
        (='.'=)
        (")_(")
  `,
  },
  {
    label: 'home',
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
  const [animationDuration, setAnimationDuration] = useState(0); // State to hold animation duration
  const [lastPosition, setLastPosition] = useState(0); // State to store last generated y position

  const typingSpeed = 100; // Adjusted typing speed (milliseconds)

  const lines = [
    'unplug the servers, let the algorithm rest',
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
    const generateAsciiInstance = () => {
      const asciiHeight = 200; // Set the height of the ASCII instance
      let newTop;
      
      do {
        newTop = getRandomInt(50, window.innerHeight - 110); // Random y position within the viewport
      } while (Math.abs(newTop - lastPosition) <= asciiHeight); // Ensure sufficient vertical space
      
      setLastPosition(newTop);

      const newAsciiInstance = {
        ...asciiImages[getRandomInt(0, asciiImages.length - 1)],
        top: newTop,
        width: getRandomInt(100, 200), // Random width for the ASCII instance
        height: asciiHeight, // Fixed height for the ASCII instance
      };
      setAsciiInstances((prev) => [...prev, newAsciiInstance]);
    };

    if (isMovementEnabled) {
      const interval = setInterval(generateAsciiInstance, 2000); // Adjust appearance interval (milliseconds)

      // Clear interval on unmount
      return () => clearInterval(interval);
    }
  }, [isMovementEnabled, lastPosition]);

  useEffect(() => {
    const initialScreenWidth = window.innerWidth;
    let animationTimeout;
  
    const resizeHandler = () => {
      const currentScreenWidth = window.innerWidth;
      const updatedDuration = Math.max(20, 15 - currentScreenWidth / 200);
  
      // Clear previous animation timeout if it exists
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
  
      // Set a timeout to update animation duration after resize has stopped
      animationTimeout = setTimeout(() => {
        setAnimationDuration(updatedDuration);
      }, 200); // Adjust debounce time as needed
    };
  
    // Initial calculation of animation duration
    const initialAnimationDuration = Math.max(20, 15 - initialScreenWidth / 200);
    setAnimationDuration(initialAnimationDuration);
  
    // Add event listener for window resize
    window.addEventListener('resize', resizeHandler);
  
    // Cleanup function to remove event listener and clear animation timeout
    return () => {
      window.removeEventListener('resize', resizeHandler);
      clearTimeout(animationTimeout);
    };
  }, []);
  

  const toggleMovement = () => {
    setIsMovementEnabled(!isMovementEnabled);
  };

  return (
    <div className="TestingPage">
      <div className="ascii-instance-container">
        {asciiInstances.map((instance, index) => (
          <div
            className="ascii-box"
            style={{
              top: `${instance.top}px`,
              left: `${instance.left}px`,
              width: `${instance.width}px`,
              height: `${instance.height}px`,
              animationDelay: `${index * 2}s`,
              animationPlayState: isMovementEnabled ? 'running' : 'paused',
              animationDuration: `${animationDuration}s`, // Use dynamic animation duration
            }}
            key={index}
          >
            <AsciiImage image={instance} />
          </div>
        ))}
      </div>
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
      <pre>{image.art}</pre>
    </div>
  );
}

export default TestingPage;
