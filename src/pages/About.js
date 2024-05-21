import React, {useEffect} from 'react';
import Wip from '../components/Wip'
import ASCIIAnimation from '../components/ASCIIAnimation';
const About = () => {
  useEffect(() => {
    // Disable scroll on component mount
    document.body.style.overflow = 'hidden';

    // Cleanup: Allow scroll on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className= "about">
      <Wip/>

      
      {/* Add information about yourself here

      <div style={{ fontFamily: 'jgs, sans-serif' }}>Lorem ipsum dolor sit amet (jgs)</div>
      <div style={{ fontFamily: 'jgs-bold, sans-serif' }}>Consectetur adipiscing elit (jgs-bold)</div>
      <div style={{ fontFamily: 'abordage, sans-serif' }}>Sed do eiusmod tempor incididunt (abordage)</div>
      <div style={{ fontFamily: 'basalte-fond, sans-serif' }}>Ut labore et dolore magna aliqua (basalte-fond)</div>
      <div style={{ fontFamily: 'basalte-multicolor, sans-serif' }}>Ut enim ad minim veniam (basalte-multicolor)</div>
      <div style={{ fontFamily: 'basalte-volume, sans-serif' }}>Quis nostrud exercitation ullamco (basalte-volume)</div>
      <div style={{ fontFamily: 'director-bold, sans-serif' }}>Laboris nisi ut aliquip ex ea commodo consequat (director-bold)</div>
      <div style={{ fontFamily: 'director-light, sans-serif' }}>Duis aute irure dolor in reprehenderit (director-light)</div>
      <div style={{ fontFamily: 'director-regular, sans-serif' }}>Excepteur sint occaecat cupidatat non proident (director-regular)</div>
      <div style={{ fontFamily: 'director-variable, sans-serif' }}>Sunt in culpa qui officia deserunt (director-variable)</div>
      <div style={{ fontFamily: 'equateur, sans-serif' }}>Mollit anim id est laborum (equateur)</div>
      <div style={{ fontFamily: 'ft88-bold, sans-serif' }}>Lorem ipsum dolor sit amet (ft88-bold)</div>
      <div style={{ fontFamily: 'ft88-expanded, sans-serif' }}>Consectetur adipiscing elit (ft88-expanded)</div>
      <div style={{ fontFamily: 'ft88-gothique, sans-serif' }}>Sed do eiusmod tempor incididunt (ft88-gothique)</div>
      <div style={{ fontFamily: 'ft88-italic, sans-serif' }}>Ut labore et dolore magna aliqua (ft88-italic)</div>
      <div style={{ fontFamily: 'ft88, sans-serif' }}>Ut enim ad minim veniam (ft88)</div>
      <div style={{ fontFamily: 'ft88-school, sans-serif' }}>Quis nostrud exercitation ullamco (ft88-school)</div>
      <div style={{ fontFamily: 'ft88-serif, sans-serif' }}>Excepteur sint occaecat cupidatat non proident (ft88-serif)</div>
      <div style={{ fontFamily: 'latitude, sans-serif' }}>Sunt in culpa qui officia deserunt (latitude)</div>
      <div style={{ fontFamily: 'louise, sans-serif' }}>Mollit anim id est laborum (louise)</div>
      <div style={{ fontFamily: 'bzd-base, sans-serif' }}>Lorem ipsum dolor sit amet (bzd-base)</div>
      <div style={{ fontFamily: 'bzd-brush, sans-serif' }}>Consectetur adipiscing elit (bzd-brush)</div>
      <div style={{ fontFamily: 'bzd-bubble, sans-serif' }}>Sed do eiusmod tempor incididunt (bzd-bubble)</div>
      <div style={{ fontFamily: 'bzd-cloud, sans-serif' }}>Ut labore et dolore magna aliqua (bzd-cloud)</div>
      <div style={{ fontFamily: 'bzd-cube, sans-serif' }}>Ut enim ad minim veniam (bzd-cube)</div>
      <div style={{ fontFamily: 'bzd-messier, sans-serif' }}>Quis nostrud exercitation ullamco (bzd-messier)</div>
      <div style={{ fontFamily: 'bzd-messy, sans-serif' }}>Excepteur sint occaecat cupidatat non proident (bzd-messy)</div>
      <div style={{ fontFamily: 'bzd-pearl, sans-serif' }}>Sunt in culpa qui officia deserunt (bzd-pearl)</div>
      <div style={{ fontFamily: 'bzd-ring, sans-serif' }}>Mollit anim id est laborum (bzd-ring)</div>
      <div style={{ fontFamily: 'bzd-stitches, sans-serif' }}>Lorem ipsum dolor sit amet (bzd-stitches)</div>
      */}
    </div>
  );
};

export default About;
