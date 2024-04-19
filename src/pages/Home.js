import React from 'react';
import HeroSection from '../components/HeroSection';
import '../styles/App.css'
//import VisitorCounter from '../components/VisitorCounter';
const Home = () => {
    return (
      <div className="home">
        {/* Add your content here */}
        <HeroSection/>
        {/* Conditionally render the MusicPlayer component 
                <VisitorCounter/>
                */}

      </div>
    );
  };
  
  export default Home;