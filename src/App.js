import './styles/App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import VideoDescription from './components/VideoDescription/VideoDescription';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="textContainer container">
        <div className="textContainer__videoDesAndComments">
          <VideoDescription />
        </div>
        <div className="textContainer__videos"></div>
      </div>
    </>
  );
}

export default App;
