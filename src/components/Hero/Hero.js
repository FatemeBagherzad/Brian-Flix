import React, { useRef, useState } from 'react';
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaClosedCaptioning,
  FaVolumeUp,
  FaVolumeMute,
  FaReply,
} from 'react-icons/fa';

import video from '../../assets/video/stream.mp4';
import './Hero.scss';

const Hero = (props) => {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const handleLoop = () => {
    setIsLooping(!isLooping);
    videoRef.current.loop = !isLooping;
  };
  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
    let b = currentTime.toFixed(2);
    setPlaybackRate(b);
  };
  const handleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };
  const handleFullScreen = () => {
    if (!isFullScreen) {
      videoContainerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  };

  // --------------------------------------------
  return (
    <div className="hero container" ref={videoContainerRef}>
      <video
        ref={videoRef}
        onTimeUpdate={handleProgress}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster={props.video.image}
        className="hero__video"
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="controls">
        <div className="controls__containers">
          <button onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button onClick={handleLoop}>
            {isLooping ? <FaReply /> : <FaReply color="#999" />}
          </button>
        </div>

        <div className="controls__slideBar">
          <input
            type="range"
            min="1"
            max="100"
            step="0.01"
            value={progress}
            onChange={handleProgress}
          />
          <span>{playbackRate}</span>
        </div>

        <div className="controls__containers">
          <button onClick={handleSubtitles}>
            {showSubtitles ? (
              <FaClosedCaptioning />
            ) : (
              <FaClosedCaptioning color="#999" />
            )}
          </button>

          <button onClick={handleFullScreen}>
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </button>

          <button
            className="volumeBtn"
            onClick={() => {
              let a = document.querySelector('.volume');
              if (a.hasAttribute('id')) {
                a.removeAttribute('id');
              } else {
                a.setAttribute('id', 'volume');
              }
            }}
          >
            <div className="volume" id="volume">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
            {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Hero;
