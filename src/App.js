import data from '../src/data/video-details.json';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import VideoDescription from './components/VideoDescription/VideoDescription';
import VideoList from './components/VideoList/VideoList';
import CommentList from './components/CommentList/CommentList';
import CommentForm from './components/CommentForm/CommentForm';
import './styles/App.scss';
import { useState } from 'react';

function App() {
  const [videos, setVideos] = useState(data);
  const [hero, setHero] = useState(data[0]);
  const [progress, setProgress] = useState(0);

  console.log('app', progress);
  return (
    <>
      <Header />
      <Hero video={hero} progress={progress} setProgress={setProgress} />

      <div className="textContainer container">
        <div className="textContainer__videoDesAndComments">
          <VideoDescription hero={hero} />
          <CommentForm />
          <CommentList hero={hero} />
        </div>

        <div className="textContainer__videos">
          <span className="textContainer__videos-title">NEXT VIDEOS</span>
          <VideoList
            videos={videos}
            setVideos={setVideos}
            setHero={setHero}
            hero={hero}
            progress={progress}
            setProgress={setProgress}
          />
        </div>
      </div>
    </>
  );
}

export default App;
