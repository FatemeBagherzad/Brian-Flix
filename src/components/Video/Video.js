import '../Video/Video.scss';

const Video = ({ video, updateVideoList }) => {
  // const selectedvideo = videos.find((video) => video.id === videoId);
  return (
    <div className="video">
      <div>
        <img src={video.image} className="video__img" id={video.id} />
      </div>
      <div className="video__txtCont">
        <p className="video__txtCont-header">{video.title}</p>
        <p className="video__txtCont-p">{video.channel}</p>
      </div>
    </div>
  );
};
export default Video;
