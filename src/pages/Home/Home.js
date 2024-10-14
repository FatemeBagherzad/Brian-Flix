import './Home.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Hero2 from '../../components/Hero/Hero2';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import VideoList from '../../components/VideoList/VideoList';
import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';

function Home() {
  const [videos, setVideos] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');
  const { videoId } = useParams();
  const [restaurants, setRestaurants] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8888/videos').then((response) => {
      setVideos(response.data);
      setCurrentVideo(response.data[0]);
    });
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      const currentid = videoId ? videoId : videos[0].id;
      axios
        .get('http://localhost:8888/videos/' + currentid)
        .then((response) => {
          window.scroll({ top: 0 });
          setCurrentVideo(response.data);
        });
    }
  }, [videoId, videos]);

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8888/videos/' + currentVideo.id, {
        name: 'Fateme',
        comment: `${event.target.comment.value}`,
        likes: 0,
        timeStamp: 0,
      })
      .then((response) => {
        setCurrentVideo(response.data);
      })
      .catch((err) => console.log(err));

    event.target.comment.value = '';
  };

  return (
    <>
      <Header />

      {currentVideo && <Hero2 currentVideo={currentVideo} />}

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
