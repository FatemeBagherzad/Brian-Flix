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
}) => {
  const updateVideoList = () => {
    let clickedId = id;
    const filtereDt = videos.filter((obj) => obj.id !== clickedId);
    filtereDt.push(hero);
    setVideos(filtereDt);
    let newHero = videos.filter((obj) => obj.id === clickedId)[0];
    setHero(newHero);
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
