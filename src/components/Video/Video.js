import '../Video/Video.scss';

const Video = ({ video }) => {
  console.log(video);
  // const selectedvideo = videos.find((video) => video.id === videoId);
  return (
    <div className="video">
      <div>
        <img
          src={video.image}
          className="video__img"
          id={video.id}
          alt={video.title}
        />
      </div>
      <div className="video__txtCont">
        <p className="video__txtCont-header">{video.title}</p>
        <p className="video__txtCont-p">{video.channel}</p>
      </div>
    </div>
  );
};
export default Video;
