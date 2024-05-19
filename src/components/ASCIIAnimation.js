import React, { useEffect, useRef, useState, useCallback } from 'react';

const ASCIIAnimation = ({ videoPath, fps, charsWidth, color }) => {
    console.log("video path ="+videoPath)
  const videoRef = useRef(null); // Ref to the video element
  const asciiRef = useRef(null); // Ref to the <pre> displaying ASCII art
  const pixels = "@%#*+=-:;~<>^()_{}|\\/?,.`\"";
  const [frames, setFrames] = useState([]); // Array to store generated ASCII frames

  // Function to generate ASCII frames from the video
// Function to generate ASCII frames from the video
const generateAsciiFrames = useCallback(async () => {
    console.log("in generate ascii frames");
    const video = videoRef.current;
    let localFrames = [];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const frameInterval = 1 / fps;

    for (let i = 0; i < Math.ceil(video.duration * fps); i++) {
        const currentTime = i * frameInterval;
        console.log("time = " + currentTime);
        video.currentTime = currentTime;

        await new Promise(resolve => {
            video.onseeked = () => {
                video.pause();
                resolve();
            };
        });

        // Determine the width of ASCII frames
        const asciiWidth = charsWidth;

        // Calculate aspect ratio of the video
        const aspectRatio = video.videoWidth / video.videoHeight;

        // Determine the height of ASCII frames based on aspect ratio
        const asciiHeight = Math.floor(asciiWidth / (2 * aspectRatio)); // Half of the width

        canvas.width = asciiWidth;
        canvas.height = asciiHeight;
        console.log("width = " + canvas.width + ", height = " + canvas.height);
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
        console.log("asciiString = " + asciiString);
        localFrames.push(asciiString);
    }

    setFrames(localFrames);
}, [charsWidth, fps, pixels]);

  // Function to display and animate the ASCII frames
  const generateCharsAnimation = useCallback(() => {
    console.log("in generate chars animation");
    let currentFrame = 0;
    const totalFrames = frames.length;

    const animate = () => {
      if (totalFrames > 0) {
        asciiRef.current.innerText = frames[currentFrame];
        currentFrame = (currentFrame + 1) % totalFrames;
        setTimeout(animate, 1000 / fps); // Control animation speed based on fps
      }
    };
    console.log("total frames =" +totalFrames)
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

  //make cursor show you can click
  return (
    <div className = "ascii-container"> 
      <video ref={videoRef} src={videoPath} crossOrigin="anonymous" style={{ display: 'none' }} />
      <pre ref={asciiRef} style={{ fontFamily: 'monospace', fontSize: '5px',color: color, backgroundColor: 'black', paddingTop:'5%', whiteSpace: 'pre', overflow: 'hidden' }} />
    </div>
  );
};

export default ASCIIAnimation;
