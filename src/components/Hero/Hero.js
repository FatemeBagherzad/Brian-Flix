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
import './Hero.scss';

const Hero = ({ currentVideo, progress, setProgress }) => {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(currentVideo.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playtime, setPlaytime] = useState(0);
  const [remaintime, setRemaintime] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0.1);

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
    setProgress(0);
    if (videoRef.current.currentTime === 0) {
      setProgress(0);
      setPlaytime(0);
      setRemaintime(0);
    }

    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const prog = (currentTime / duration) * 100;

    setProgress(prog);

    let remain = (duration - currentTime).toFixed(2);
    setRemaintime(remain);

    let playtm = currentTime.toFixed(2);
    setPlaytime(playtm);

    if (prog >= 100) {
      videoRef.current.currentTime = 0;
      console.log(videoRef.current.currentTime);
      setProgress(0);
      setPlaytime(0);
      setRemaintime(0);
    }
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
        poster={currentVideo.image}
        className="hero__video"
        preload="auto"
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
              step="0.01"
              value={progress}
              onChange={handleProgress}
            />
            <div
              className="controls__input--overlay"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="controls__containers--btn">
            {playtime}/{remaintime}
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
            onClick={handleFullScreen}
            className="controls__containers--btn"
          >
            {isFullScreen ? <FaCompress /> : <FaExpand />}
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
