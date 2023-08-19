import React, { useState } from 'react';
import '../styles/FallingImages.css';
import angel from '../images/angels.png';
import sauerkraut from '../images/sauerkraut.PNG';

const FallingImages = () => {
  const [funFact, setFunFact] = useState('');
  const [fallingImages, setFallingImages] = useState([
    { src: angel, alt: 'Image 1', fact: 'I love angels!', show: true },
    { src: sauerkraut, alt: 'Image 2', fact: 'I enjoy fermenting foods. (this is sauerkraut)', show: true },
    // Add more images and facts to the array
  ]);

  const handleImageClick = (fact, index) => {
    setFunFact(fact);
    const updatedFallingImages = [...fallingImages];
    updatedFallingImages[index].show = false;
    setFallingImages(updatedFallingImages);
  };
  const dismissFunFact = () => {
    setFunFact('');
  };

  return (
    <div className="falling-images-container">
      {fallingImages.map((image, index) => (
        image.show && (
          <div
            className="falling-image"
            style={{ left: `${Math.random() * 100}vw` }} // Random horizontal position
            key={index}
            onClick={() => handleImageClick(image.fact, index)}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        )
      ))}
      {funFact && <div className="fun-fact">{funFact}       <span className="close-button" onClick={dismissFunFact}>
            &times;
          </span></div>}

    </div>
  );
};

export default FallingImages;
