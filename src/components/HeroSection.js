import React from 'react';
import '../styles/HeroSection.css';
import { Fade } from 'react-reveal';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Fade>
    <h1 className="headline">
      <span className="name">Dahlia Xie </span> 
      is a Software Engineer based out of Seattle, Washington. 
      She graduated from Washington State University in May 2023 with a B.S. in Software Engineering and a minor in Digital Technology and Culture. 
      She has experience as a Fullstack Software Engineer, UX Designer, Web Developer, DJ, and Editor.
    </h1>
    </Fade>

    </section>
  );
};



export default HeroSection;

/*
      <p className="subheadline">Showcasing Your Awesome Work</p>
      <button className="cta-button">Get Started</button>
*/