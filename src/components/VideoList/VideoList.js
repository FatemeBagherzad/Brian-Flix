import Video from '../Video/Video';
import '../VideoList/VideoList.scss';

const VideoList = ({
  videos,
  setVideos,
  setHero,
  hero,
  progress,
  setProgress,
}) => {
  const allVideosButHero = videos.filter((obj) => obj.id !== hero.id);
  console.log('videolist', progress);

  return (
    <section className="videoList">
      {allVideosButHero.map((video, index) => (
        <Video
          key={index}
          id={video.id}
          title={video.title}
          channel={video.channel}
          image={video.image}
          setVideos={setVideos}
          videos={allVideosButHero}
          setHero={setHero}
          hero={hero}
          progress={progress}
          setProgress={setProgress}
        />
      ))}
    </section>
  );
};
export default VideoList;
