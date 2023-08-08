import Video from '../Video/Video';
import '../VideoList/VideoList.scss';

const VideoList = ({ videos, setVideos, setHero, hero }) => {
  return (
    <section className="videoList">
      {videos.map((video, index) => (
        <Video
          key={index}
          id={video.id}
          title={video.title}
          channel={video.channel}
          image={video.image}
          setVideos={setVideos}
          videos={videos}
          setHero={setHero}
          hero={hero}
        />
      ))}
    </section>
  );
};
export default VideoList;
