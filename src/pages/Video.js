
// Create a separate Video.js component
// This component will handle the actual video rendering
import '../styles/Sample.css'
import React from 'react';

const Video = ({ src, style }) => {
  return (
    <video autoPlay muted loop style={{ ...style, position: 'absolute' }}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
