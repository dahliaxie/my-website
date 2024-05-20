import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/Ascii.css';
import loadingGif from '../videos/loading2.gif';

const ASCIIAnimation = ({ videoPath, fps, charsWidth, color }) => {
  const videoRef = useRef(null);
  const asciiRef = useRef(null);
  const pixels = "@%#*+=-:;~<>^()_{}|\\/?,.`\"";
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [processedFrames, setProcessedFrames] = useState(0); // Track the number of processed frames
  const [fadeIn, setFadeIn] = useState(false); // Track whether to fade in the ASCII animation

  const generateAsciiFrames = useCallback(async () => {
    const video = videoRef.current;
    let localFrames = [];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const frameInterval = 1 / fps;
    const totalFrames = Math.ceil(video.duration * fps);

    for (let i = 0; i < totalFrames; i++) {
      const currentTime = i * frameInterval;
      video.currentTime = currentTime;

      await new Promise(resolve => {
        video.onseeked = () => {
          video.pause();
          resolve();
        };
      });

      const asciiWidth = charsWidth;
      const aspectRatio = video.videoWidth / video.videoHeight;
      const asciiHeight = Math.floor(asciiWidth / (2 * aspectRatio));

      canvas.width = asciiWidth;
      canvas.height = asciiHeight;
      console.log("canvas width = "+ canvas.width);
      console.log("canvas height = "+canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      let asciiString = '';

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = 4 * (y * canvas.width + x);
          const [r, g, b] = imgData.data.slice(index, index + 3);
          const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
          const char = pixels[Math.floor((gray / 255) * (pixels.length - 1))];
          asciiString += char;
        }
        asciiString += '\n';
      }

      localFrames.push(asciiString);
      setProcessedFrames(i + 1); // Update the number of processed frames
    }

    setFrames(localFrames);
    setLoading(false); // Set loading to false when frames are loaded
    setFadeIn(true); // Trigger fade in animation
  }, [charsWidth, fps, pixels]);

  const generateCharsAnimation = useCallback(() => {
    let currentFrame = 0;
    const totalFrames = frames.length;

    const animate = () => {
      if (totalFrames > 0) {
        asciiRef.current.innerText = frames[currentFrame];
        currentFrame = (currentFrame + 1) % totalFrames;
        setTimeout(animate, 1000 / fps);
      }
    };

    animate();
  }, [frames, fps]);

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoLoad = () => {
      generateAsciiFrames().catch(error => console.error('Error generating ASCII frames:', error));
    };

    video.addEventListener('loadeddata', handleVideoLoad);

    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
    };
  }, [generateAsciiFrames]);

  useEffect(() => {
    if (frames.length > 0) {
      generateCharsAnimation();
    }
  }, [frames, generateCharsAnimation]);

  return (
    <div>
      {loading ? (
        <div className="loading">
          <img src={loadingGif} alt="Loading..." />
          {Math.ceil(videoRef.current?.duration * fps) ? (
            <p>Processing Frames: {processedFrames}/{Math.ceil(videoRef.current?.duration * fps)}</p>
          ) : (<p></p>)}
        </div> // Display loading icon while frames are loading
      ) : (
        <pre ref={asciiRef} className="ascii-body" />
      )}
      <video ref={videoRef} src={videoPath} crossOrigin="anonymous" style={{ display: 'none' }} />
    </div>
  );
};

export default ASCIIAnimation;
