import React, { useState, useEffect, lazy, Suspense } from 'react';
import nature3 from '../videos/nature3.mp4';
import eye2 from '../videos/eye2.mp4';
import eye from '../videos/eye.mp4';
import me2 from '../videos/me2.mp4';
import '../styles/Sample.css'

const Sample = () => {
  const [videos, setVideos] = useState([]);
  const numberOfVideos = 10; // Adjust this to control the number of videos /2
  const maxVideoSize = 300; // Maximum width and height in pixels
  const delayBetweenVideos = 500; // Delay in milliseconds between video appearances

  const generateVideoStyles = (index) => {
    const minGap = 100; // Adjust this value for desired spacing
    const maxWidth = Math.min(maxVideoSize, window.innerWidth); // Don't exceed viewport width
    const headerHeight = (document.querySelector('.header').offsetHeight* 0.7); // Get header height
    const maxHeight = Math.min(maxVideoSize, window.innerHeight - headerHeight - minGap); // Adjust for header height
  
    const width = Math.floor(Math.random() * (maxWidth)) + 100; // Random width within limits
    const height = Math.floor(Math.random() * (maxHeight - 100)) + 100; // Random height within limits
  
    // Calculate maximum allowed top position to avoid header overlap
    const maxTop = window.innerHeight - height - minGap;
    // Generate random top position within allowed range (headerHeight to maxTop)
    const top = Math.floor(Math.random() * (maxTop + 1) + headerHeight); 
  
    const left = Math.floor(Math.random() * (window.innerWidth - width));
    const zIndex = Math.floor(Math.random() * 10) + 1; // Random z-index for layering
  
    return { width, height, top, left, zIndex };
  };
  
  useEffect(() => {
    const createVideos = async () => {
      const videoElements = [];
      for (let i = 0; i < numberOfVideos; i++) {
        const delay = Math.floor(Math.random() * (numberOfVideos * delayBetweenVideos)); // Random delay within range

        // Lazy load video components using dynamic imports
        const VideoComponent = lazy(() => import('./Video'));

        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'video';
        preloadLink.href = [nature3, eye2, me2][Math.floor(Math.random() * 3)]; // Choose a random video source
        document.head.appendChild(preloadLink);

        videoElements.push({
          src: nature3,
          style: generateVideoStyles(i),
          delay,
          component: VideoComponent,
        });

        videoElements.push({
          src: eye2,
          style: generateVideoStyles(i),
          delay,
          component: VideoComponent,
        });

        videoElements.push({
          src: me2,
          style: generateVideoStyles(i),
          delay,
          component: VideoComponent,
        });
      }

      setVideos(videoElements);
    };

    createVideos();
  }, []);
useEffect(() => {
  const handleResize = () => {
    const newVideos = videos.map((video) => ({
      ...video,
      style: generateVideoStyles(video.style), // Re-generate styles based on new window dimensions
    }));
    setVideos(newVideos);
  };

  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, [videos]);

  return (
    <section className="video-container">
      {videos.map((video, index) => (
        <Suspense key={index} fallback={<div></div>}>
          <video.component key={index} {...video} autoPlay muted loop />
        </Suspense>
      ))}
    </section>
  );
};

export default Sample;