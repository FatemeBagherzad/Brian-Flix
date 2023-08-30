import './Home.scss';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import APIService from '../../components/APIService';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoList from '../../components/VideoList/VideoList';
import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';

function App() {
  const [videos, setVideos] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const [progress, setProgress] = useState(0);
  const { videoId } = useParams();

  useEffect(() => {
    APIService.getAllVideosSummary().then((response) => {
      setVideos(response);
    });
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      APIService.getVideoById(videoId ? videoId : videos[0].id).then(
        (response) => {
          window.scroll({ top: 0 });
          // setProgress(0);
          setCurrentVideo(response);
        }
      );
    }
  }, [videoId, videos]);

  return (
    <>
      <Header />

      {currentVideo && (
        <Hero
          currentVideo={currentVideo}
          progress={progress}
          setProgress={setProgress}
        />
      )}

      <div className="container textContainer">
        <div className="textContainer__videoDesAndComments">
          {currentVideo && <VideoDescription currentVideo={currentVideo} />}
          <CommentForm />
          {currentVideo && <CommentList currentVideo={currentVideo} />}
        </div>

        <div className="textContainer__videos">
          <span className="textContainer__videos-title">NEXT VIDEOS</span>
          {videos ? (
            <VideoList videos={videos} currentVideo={currentVideo} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
