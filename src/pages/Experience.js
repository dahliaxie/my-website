import React, { useState, useEffect } from 'react';
import '../styles/Experience.css'; // Adjust the path as needed
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
  to build innovative solutions.
`;

const Experience = () => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setTextVisible(true), 500); // Adjust fade-in delay

    return () => clearTimeout(timeoutId);
  }, []);

  const withCompanyLinks = fullExperienceText.replace(
    /Neopets|Eagleview|Liberty Mutual|Chase Cost Management|Poatek IT Consulting|Inward/g,
    (match) => {
      switch (match) {
        case 'Neopets':
          return `<u><a href="https://www.neopets.com/"target="_blank">Neopets</a></u>`;
        case 'Eagleview':
          return `<u><a href="https://www.eagleview.com/"target="_blank">Eagleview</a></u>`;
        case 'Liberty Mutual':
          return `<u><a href="https://www.libertymutual.com/"target="_blank">Liberty Mutual</a></u>`;
        case 'Chase Cost Management':
          return `<u><a href="https://www.ccmchase.com/"target="_blank">Chase Cost Management</a></u>`;
        case 'Poatek IT Consulting':
          return `<u><a href="https://www.poatek.com/"target="_blank">Poatek IT Consulting</a></u>`;
        case 'Inward':
          return `<u><a href="https://www.joininward.com/"target="_blank">Inward</a></u>`;
        default:
          return match; // Handle unexpected matches (optional)
      }
    }
  );

  return (
    <div className="experience-page">
      <p className={`experience-text ${textVisible ? 'visible' : ''}`} dangerouslySetInnerHTML={{ __html: withCompanyLinks }}></p>
    </div>
  );
};

export default Experience;
