import Video from '../Video/Video';
import '../VideoList/VideoList.scss';

const VideoList = ({
  videos,

  currentVideo,
  progress,
  setProgress,
  updateVideoList,
}) => {
  const allVideosButCurrent = videos.filter(
    (obj) => obj.id !== currentVideo.id
  );

  return (
    <section className="videoList">
      {allVideosButCurrent &&
        allVideosButCurrent.map((video, index) => (
          <Video
            key={index}
            id={video.id}
            title={video.title}
            channel={video.channel}
            image={video.image}
            allVideosButCurrent={allVideosButCurrent}
            currentVideo={currentVideo}
            progress={progress}
            setProgress={setProgress}
            updateVideoList={updateVideoList}
          />
        ))}
    </section>
  );
};
export default VideoList;
