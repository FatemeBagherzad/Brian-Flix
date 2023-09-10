import React, { useEffect, useRef, useState } from 'react';
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
import './Hero.scss';

const Hero = ({ currentVideo }) => {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(currentVideo.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [playtime, setPlaytime] = useState(0);
  const [remaintime, setRemaintime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDraggingSeekBar, setIsDraggingSeekBar] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    videoRef.current.load();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
    setRemaintime(0);
  }, [currentVideo.image]);

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
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const handleMouseDown = (e) => {
    const newprog = parseFloat(e.target.value);
    setCurrentTime(newprog);
    // setIsDraggingSeekBar(true);
    videoRef.current.currentTime = newprog;
  };
  const handleMouseUp = () => {
    if (isDraggingSeekBar) {
      videoRef.current.play();
      setIsDraggingSeekBar(false);
    }
  };
  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    let remain = (duration - currentTime).toFixed(2);
    setRemaintime(remain);
    let playtm = currentTime.toFixed(2);
    setPlaytime(playtm);
    if (!isDraggingSeekBar) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  const handleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  };

  //Full Screen ---------------
  const toggleFullscreen = () => {
    const video = videoRef.current;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullscreen(!isFullscreen);
  };
  const handleFullscreenChange = () => {
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };
  const handleEscKey = (event) => {
    if (event.key === 'Escape' && isFullscreen) {
      toggleFullscreen();
    }
  };
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isFullscreen]);

  // --------------------------------------------

  return (
    <div className="hero container" ref={videoContainerRef}>
      <video
        ref={videoRef}
        onTimeUpdate={handleProgress}
        onEnded={() => {
          setIsPlaying(false);
          videoRef.current.load();
        }}
        poster={currentVideo.image}
        className="hero__video"
      >
        <source
          src={`${currentVideo.video}?api_key=BrainFlixVideoSrc`}
          type="video/mp4"
        />
      </video>

      <div className="controls container">
        <div className="controls__containers">
          <button
            onClick={handlePlayPause}
            className="controls__containers--btn"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button onClick={handleLoop} className="controls__containers--btn">
            {isLooping ? <FaReply /> : <FaReply color="#999" />}
          </button>
        </div>

        <div className="controls__slideBar">
          <div className="controls__inputWrapper">
            <input
              className="controls__input"
              type="range"
              min="0"
              max="100"
              step="1"
              value={
                currentTime === 0
                  ? 0
                  : (currentTime / videoRef.current.duration) * 100
              }
              onChange={handleSeek}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            />
            <div
              className="controls__input--overlay"
              style={{ width: `${currentTime * 10}%` }}
            ></div>
          </div>
          <span className="controls__containers--btn">
            {playtime}/{videoRef.current.duration ? remaintime : '0:00'}
          </span>
        </div>

        <div className="controls__containers">
          <button
            onClick={handleSubtitles}
            className="controls__containers--btn"
          >
            {showSubtitles ? (
              <FaClosedCaptioning />
            ) : (
              <FaClosedCaptioning color="#999" />
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            className="controls__containers--btn"
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>

          <button
            className="volumeBtn controls__containers--btn"
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
                className="volume__input"
                type="range"
                min="0"
                max="1"
                step="0.01"
                orient="vertical"
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
