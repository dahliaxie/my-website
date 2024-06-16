import React, { useRef, useState, useEffect } from 'react';
import loadingGif from '../videos/loading2.gif';

const ASCIIAnimation = ({ videoPath, fps, charsWidth, color }) => {
  const videoRef = useRef(null);
  const asciiRef = useRef(null);
  const pixels = "@%#*+=-:;~<>^()_{}|\\/?,.`\"";
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processedFrames, setProcessedFrames] = useState(0);

  const generateAsciiFrames = async () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const frameInterval = 1 / fps;
    const totalFrames = Math.ceil(video.duration * fps);
    const asciiWidth = charsWidth;
    const localFrames = [];

    canvas.width = asciiWidth;
    canvas.height = Math.floor(asciiWidth / (video.videoWidth / video.videoHeight));

    for (let i = 0; i < totalFrames; i++) {
      const currentTime = i * frameInterval;
      video.currentTime = currentTime;

      await new Promise(resolve => {
        video.onseeked = () => {
          video.pause();
          resolve();
        };
      });

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const asciiString = convertToASCII(context.getImageData(0, 0, canvas.width, canvas.height), asciiWidth);
      localFrames.push(asciiString);
      setProcessedFrames(i + 1);
    }

    setFrames(localFrames);
    setLoading(false);
  };

  const convertToASCII = (imgData, asciiWidth) => {
    let asciiString = '';
    const pixelData = imgData.data;
    const pixelsPerChar = 4; // RGBA

    for (let y = 0; y < imgData.height; y++) {
      for (let x = 0; x < imgData.width; x++) {
        const index = (y * imgData.width + x) * pixelsPerChar;
        const r = pixelData[index];
        const g = pixelData[index + 1];
        const b = pixelData[index + 2];
        const brightness = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        const char = pixels[Math.floor((brightness / 255) * (pixels.length - 1))];
        asciiString += char;
      }
      asciiString += '\n';
    }

    return asciiString;
  };

  const generateCharsAnimation = () => {
    let currentFrame = 0;
    const totalFrames = frames.length;

    const animate = () => {
      if (asciiRef.current && totalFrames > 0) {
        asciiRef.current.innerText = frames[currentFrame];
        currentFrame = (currentFrame + 1) % totalFrames;
        requestAnimationFrame(animate); // Use requestAnimationFrame for smoother animation
      }
    };

    animate();
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoLoad = () => {
      generateAsciiFrames().catch(error => console.error('Error generating ASCII frames:', error));
    };

    video.addEventListener('loadeddata', handleVideoLoad);

    return () => {
      video.removeEventListener('loadeddata', handleVideoLoad);
    };
  }, []);

  useEffect(() => {
    if (frames.length > 0) {
      generateCharsAnimation();
    }
  }, [frames]);

  return (
    <div className="ascii-container">
      <div className="ascii-body" ref={asciiRef}></div>
      {loading && (
        <div className="loading">
          <img src={loadingGif} alt="Loading..." />
          {Math.ceil(videoRef.current?.duration * fps) ? (
            <p>processing frames: {processedFrames}/{Math.ceil(videoRef.current?.duration * fps)}</p>
          ) : null}
        </div>
      )}
      <video ref={videoRef} src={videoPath} crossOrigin="anonymous" style={{ display: 'none' }} />
    </div>
  );
};

export default ASCIIAnimation;
