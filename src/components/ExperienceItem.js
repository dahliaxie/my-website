import React from 'react';
import '../styles/ExperienceItem.css';

const ExperienceItem = ({ company, title, date, responsibilities }) => {
  return (
    <div className="experience-item">
      <h3 className="experience-title">
        {title} @ {company}
      </h3>
      <p className="experience-date">{date}</p>
      <ul className="responsibilities">
        {responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceItem;
