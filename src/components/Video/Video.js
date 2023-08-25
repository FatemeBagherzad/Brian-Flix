import '../Video/Video.scss';
import { useState } from 'react';

const Video = ({
  id,
  image,
  title,
  channel,
  videos,
  setVideos,
  setHero,
  hero,
  progress,
  setProgress,
}) => {
  const updateVideoList = () => {
    let a = document.querySelector('video');
    console.log(a);
    a.load();
    let clickedId = id;
    const filterDt = videos.filter((obj) => obj.id !== clickedId);
    filterDt.push(hero);
    setVideos(filterDt);
    let newHero = videos.filter((obj) => obj.id === clickedId)[0];
    console.log(newHero);
    setHero(newHero);
    setProgress(0);
  };

  return (
    <div
      className="video"
      id={id}
      onClick={() => {
        updateVideoList();
      }}
    >
      <div>
        <img src={image} className="video__img" />
      </div>
      <div className="video__txtCont">
        <p className="video__txtCont-header">{title}</p>
        <p className="video__txtCont-p">{channel}</p>
      </div>
    </div>
  );
};
export default Video;
