import React, { useEffect, useRef, useState, useCallback } from 'react';

const GifAnimation = ({ gifPath, fps, charsWidth, color }) => {
  const gifRef = useRef(null);
  const asciiRef = useRef(null);
  const pixels = "@%#*+=-:;~<>^()_{}|\\/?,.`\"";
  const [frames, setFrames] = useState([]);

  // Function to generate ASCII frames from the GIF
  const generateAsciiFrames = useCallback(async () => {
    console.log("Generating ASCII frames...");
    const gif = gifRef.current;
    let localFrames = [];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const frameInterval = 1 / fps;

    for (let i = 0; i < Math.ceil(gif.duration * fps); i++) {
      const currentTime = i * frameInterval;
      gif.currentTime = currentTime;

      await new Promise(resolve => {
        gif.onseeked = () => {
          gif.pause();
          resolve();
        };
      });

      const asciiWidth = charsWidth;
      const aspectRatio = gif.videoWidth / gif.videoHeight;
      const asciiHeight = Math.floor(asciiWidth / (2 * aspectRatio)); // Half of the width

      canvas.width = asciiWidth;
      canvas.height = asciiHeight;

      context.drawImage(gif, 0, 0, canvas.width, canvas.height);
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
    }

    setFrames(localFrames);
    console.log("ASCII frames generated.");
  }, [charsWidth, fps, gifPath, pixels]);

  useEffect(() => {
    const gif = gifRef.current;

    const handleGifLoad = () => {
      generateAsciiFrames().catch(error => console.error('Error generating ASCII frames:', error));
    };

    gif.onload = handleGifLoad;

    return () => {
      gif.onload = null;
    };
  }, [generateAsciiFrames]);

  useEffect(() => {
    if (frames.length > 0) {
      let currentFrame = 0;
      const totalFrames = frames.length;

      const animate = () => {
        if (totalFrames > 0) {
          asciiRef.current.innerText = frames[currentFrame];
          currentFrame = (currentFrame + 1) % totalFrames;
          setTimeout(animate, 1000 / fps); // Control animation speed based on fps
        }
      };

      animate();
    }
  }, [frames, fps]);

  return (
    <div>
      <img ref={gifRef} src={gifPath} alt="GIF" style={{ display: 'none' }} />
      <pre ref={asciiRef} style={{ fontFamily: 'monospace', fontSize: '16px', color: color, backgroundColor: 'black', paddingTop: '5%', whiteSpace: 'pre', overflow: 'hidden' }} />
    </div>
  );
};

export default GifAnimation;
