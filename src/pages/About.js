import React, { useState, useEffect } from 'react';
import '../styles/About.css';

const fullExperienceText = `
  From childhood Neopets user page customization to building real-world tech, a B.S. in Software 
  Engineering and minor in Digital Technology fueled my passion to bridge the gap 
  between code and design. My internship journey began with building a health check 
  monitor for microservices at Eagleview. At Liberty Mutual, I developed a landing page 
  and icons for their Mainframe team. Chase Cost Management allowed me to build a client 
  portal to help users visualize their savings data. Poatek IT Consulting honed my skills 
  in automating project tracking with APIs, and finally, at Inward, I streamlined data 
  analysis, ensuring valuable insights were readily available. Since graduating, I have 
  worked on personal projects including a pedestrian detection model, a mobile weather 
  application, in addition to getting AWS Cloud Practitioner certified in March 2024. 
  I am excited to learn more about the evolving tech space while applying my background
  to build human-centered products.
`;

const newText = `
from childhood neopets user page customization to earning a b.s. in software engineering 
with a minor in digital technology and culture, my passion has always been bridging the 
gap between code and design. i began my internship journey at eagleview, developing a 
health check monitor for microservices. at liberty mutual, i created a landing page and 
icons for their mainframe team, followed by building a client portal at chase cost management 
to visualize savings data. at poatek, i automated client project tracking, and at 
inward, i optimized website responsiveness for higher conversion rates. since graduating, 
i've pursued personal projects such as a pedestrian detection model and a mobile weather 
application, alongside achieving aws cloud practitioner certification in march 2024. i'm 
excited to continue evolving in the tech landscape, leveraging my skills to craft 
user-centric products.
`;

const About = () => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setTextVisible(true), 500); // Adjust fade-in delay

    return () => clearTimeout(timeoutId);
  }, []);

  const withCompanyLinks = newText.replace(
    /neopets|eagleview|liberty mutual|chase cost management|poatek|inward/g,
    (match) => {
      const links = {
        'neopets': 'https://www.neopets.com/',
        'eagleview': 'https://www.eagleview.com/',
        'liberty mutual': 'https://www.libertymutual.com/',
        'chase cost management': 'https://www.ccmchase.com/',
        'poatek': 'https://www.poatek.com/',
        'inward': 'https://www.joininward.com/'
      };
      return `<u><a href="${links[match]}" target="_blank">${match}</a></u>`;
    }
  );

  return (
    <div className="about-page">
      <p className={`about-text ${textVisible ? 'visible' : ''}`} dangerouslySetInnerHTML={{ __html: withCompanyLinks }}></p>
    </div>
  );
};

export default About;
