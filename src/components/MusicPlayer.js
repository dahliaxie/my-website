import React, { useState, useEffect } from 'react';
import '../styles/MusicPlayer.css';

const MusicPlayer = ({ audioUrl, songTitle, artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    const newAudio = new Audio(audioUrl);
    newAudio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    setAudio(newAudio);

    return () => {
      newAudio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
      newAudio.pause();
      setAudio(null);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <button className={`play-button ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
        <span className="icon">{isPlaying ? '❚❚' : '▶'}</span>
      </button>
      <div className="song-info">
        <div className="song-title">{songTitle}</div>
        <div className="artist">{artist}</div>
      </div>
    </div>
  );
};

export default MusicPlayer;
