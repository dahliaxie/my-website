import React from 'react';
import MusicPlayer from '../components/MusicPlayer';
import HeroSection from '../components/HeroSection';
import HorizontalScroll from '../components/HorizontalScroll';
import ContactForm from '../components/ContactForm';
import { Element } from 'react-scroll'; // Import Element from react-scroll
//import VisitorCounter from '../components/VisitorCounter';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HorizontalScroll />
      <MusicPlayer
        audioUrl="/song.mp3"
        songTitle="heaven can wait"
        artist="organ tapes"
      />
      <Element name="contact">
        <ContactForm />
      </Element>
    </div>
  );
};

export default Home;
