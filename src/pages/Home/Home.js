import './Home.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import APIService from '../../components/APIService';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoList from '../../components/VideoList/VideoList';
import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';

function Home() {
  const [videos, setVideos] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const { videoId } = useParams();

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        `https://project-2-api.herokuapp.com/videos/${currentVideo.id}/comments?api_key=4e15e296-a8f6-4d61-bffb-cad423b094d8`,
        { name: 'user', comment: `${event.target.comment.value}` }
      )
      .then(() => {
        APIService.getVideoById(currentVideo.id).then((response) => {
          setCurrentVideo(response);
        });
      })
      .catch((err) => console.log(err));

    event.target.comment.value = '';
  };

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

      {currentVideo && <Hero currentVideo={currentVideo} />}

      <div className="container textContainer">
        <div className="textContainer__videoDesAndComments">
          {currentVideo && <VideoDescription currentVideo={currentVideo} />}
          <CommentForm
            currentVideo={currentVideo}
            commentSubmitHandler={commentSubmitHandler}
          />
          {currentVideo && (
            <CommentList
              currentVideo={currentVideo}
              setCurrentVideo={setCurrentVideo}
            />
          )}
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

export default Home;
