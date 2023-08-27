import './Home.scss';
import { useEffect, useState } from 'react';

import APIService from '../../components/APIService';
import data from '../../data/video-details.json';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoList from '../../components/VideoList/VideoList';
import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';

function App() {
  const [currentVideoID, setCurrentVideoID] = useState(data[0].id);
  const [currentVideo, setCurrentVideo] = useState(data[0]);
  const [videos, setVideos] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    APIService.getVideoById(currentVideoID).then((response) => {
      setCurrentVideo(response);
    });
    APIService.getAllVideosSummary().then((response) => {
      setVideos(response);
    });
  }, [currentVideoID]);

  const updateVideoList = (e) => {
    window.scroll({ top: 0 });
    let clickedId = e.target.id;
    console.log(clickedId);
    setCurrentVideoID(clickedId);
    // // let a = document.querySelector('video');
    // // console.log(a);
    // // a.load();
    const filterDt = videos.filter((obj) => obj.id !== clickedId);
    filterDt.push(currentVideo);
    setCurrentVideo(filterDt);
    let newCurrentVideo = videos.filter((obj) => obj.id === clickedId)[0];
    console.log(newCurrentVideo);
    setCurrentVideo(newCurrentVideo);
    setProgress(0);
  };

  return (
    <>
      <Header />
      <Hero
        currentVideo={currentVideo}
        progress={progress}
        setProgress={setProgress}
      />

      <div className="container textContainer">
        <div className="textContainer__videoDesAndComments">
          <VideoDescription currentVideo={currentVideo} />
          <CommentForm />
          <CommentList currentVideo={currentVideo} />
        </div>

        <div className="textContainer__videos">
          <span className="textContainer__videos-title">NEXT VIDEOS</span>
          {videos ? (
            <VideoList
              videos={videos}
              currentVideo={currentVideo}
              updateVideoList={updateVideoList}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
