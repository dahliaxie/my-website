import React, { useState, useEffect, lazy, Suspense } from 'react';
import nature3 from '../videos/nature3.mp4';
import eye2 from '../videos/eye2.mp4';
import me2 from '../videos/me2.mp4';
import '../styles/Sample.css';

const Sample = () => {
  const [videos, setVideos] = useState([]);
  const numberOfVideos = 10; // Adjust this to control the number of videos
  const maxVideoWidth = 300; // Maximum width in pixels
  const maxVideoHeight = 200; // Maximum height in pixels
  const delayBetweenVideos = 3000; // Delay in milliseconds between video appearances (5 seconds)

  // Function to generate random video styles
// Function to generate random video styles
const generateVideoStyles = () => {
  const minGap = 50; // Adjust this value for desired spacing
  const maxWidth = Math.min(maxVideoWidth, window.innerWidth); // Maximum width within viewport
  const maxHeight = Math.min(maxVideoHeight, window.innerHeight); // Maximum height within viewport

  const width = Math.floor(Math.random() * (maxWidth - 100)) + 100; // Random width within limits
  const height = Math.floor(Math.random() * (maxHeight - 100)) + 100; // Random height within limits

  const headerHeight = document.querySelector('.header')?.offsetHeight || 0; // Get header height safely
  const maxTop = window.innerHeight - height - minGap; // Maximum top position

  let top = Math.floor(Math.random() * (maxTop - headerHeight)) + headerHeight; // Random top position above the header

  // Ensure top position is within bounds
  if (top < headerHeight) {
    top = headerHeight + minGap; // Adjust to ensure videos are below the header
  }

  const left = Math.floor(Math.random() * (window.innerWidth - width)); // Random left position
  const zIndex = Math.floor(Math.random() * 10) + 1; // Random z-index for layering

  return { width, height, top, left, zIndex };
};


  useEffect(() => {
    const createVideos = async () => {
      const videoElements = [];
      const videoSources = [nature3, eye2, me2]; // List of video sources

      for (let i = 0; i < numberOfVideos; i++) {
        const delay = i * delayBetweenVideos; // Stagger delay based on index

        // Lazy load video components using dynamic imports
        const VideoComponent = lazy(() => import('./Video'));

        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'video';
        preloadLink.href = videoSources[Math.floor(Math.random() * videoSources.length)]; // Choose a random video source
        document.head.appendChild(preloadLink);

        videoElements.push({
          src: preloadLink.href,
          style: generateVideoStyles(),
          delay,
          component: VideoComponent,
        });
      }

      setVideos(videoElements);
    };

    createVideos();
  }, []);

  useEffect(() => {
    // Function to handle showing videos with delay
    const showVideosWithDelay = () => {
      videos.forEach((video, index) => {
        setTimeout(() => {
          setVideos(prevVideos => {
            const newVideos = [...prevVideos];
            newVideos[index] = { ...newVideos[index], show: true };
            return newVideos;
          });
        }, video.delay);
      });
    };

    if (videos.length > 0) {
      showVideosWithDelay();
    }
  }, [videos]);

  return (
    <section className="video-container">
      {videos.map((video, index) => (
        <Suspense key={index} fallback={<div>Loading...</div>}>
          {video.show && (
            <video
              key={index}
              src={video.src}
              autoPlay
              muted
              loop
              style={{
                ...video.style,
                position: 'absolute', // Ensure absolute positioning
              }}
            />
          )}
        </Suspense>
      ))}
    </section>
  );
};

export default Sample;
