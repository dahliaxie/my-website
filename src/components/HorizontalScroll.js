import React from 'react';
import '../styles/HorizontalScroll.css';

const images = [
    {
    src: require('../images/GitHubSearch.PNG'),
    link:'https://github.com/dahliaxie/Github-Repo-Search',
    alt: 'Github Repository Search',
    description: 'Github Repository Search Project (May 2023)',
  },
  {
    src: require('../images/othello.png'),
    link: 'https://github.com/dahliaxie/Othello-Game',
    alt: 'Othello for Android',
    description: 'Othello Mobile App (April 2023)',
  },
  //maybe create gifs for these app images
  {
    src: require('../images/TapGrid.png'),
    link: 'https://github.com/dahliaxie/TapGrid',
    alt: 'TapGrid for Android',
    description: 'TapGrid Mobile App (March 2023)',
  },

  {
    src: require('../images/angels.png'),
    alt: 'Digital Angel',
    description: 'Angel of Love and Death (November 2021)',
  },
    {
    src: require('../images/fortnite-milady.png'),
    alt: 'Bootleg Fortnite x Balenciaga Milady (September 2021)',
    description: 'Bootleg Fortnite x Balenciaga Milady (September 2021)',
  },
  {
    src: require('../images/iphone.jpg'),
    alt: 'Neolithic iPhone',
    description: 'Neolithic iPhone (July 2020)',
  },
    {
    src: require('../images/enemy.png'),
    link: 'https://www.instagram.com/ar/623189761792782/',
    alt: 'my first instagram filter',
    description: 'my first filter (March 2020)',
  },
    {
    src: require('../images/seattletimes.jpg'),
    link: "https://www.seattletimes.com/opinion/letters-to-the-editor/your-fashion-choices-can-help-or-hurt-the-planet/",
    alt: 'The Seattle Times - Your fashion choices can help, or hurt, the planet',
    description: 'Your fashion choices can help, or hurt, the planet (October 2019)',
  }
];

const HorizontalScroll = () => {
    return (
      <div className="horizontal-scroll-container">
        <div className="scroll-title">Past Projects</div>
        <div className="scroll-content">
          <div className="image-container">
            {images.map((image, index) => (
              <div key={index} className="image-wrapper">
                {image.link ? (
                  <a href={image.link} target="_blank" rel="noopener noreferrer">
                    <img src={image.src} alt={image.alt} className="scroll-image" />
                  </a>
                ) : (
                  <img src={image.src} alt={image.alt} className="scroll-image" />
                )}
                <p className="image-description">{image.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
export default HorizontalScroll;
