import '../Video/Video.scss';
import { useParams } from 'react-router-dom';

const Video = ({ video, updateVideoList }) => {
  // const { videoId } = useParams();
  // const selectedvideo = videos.find((video) => video.id === videoId);
  return (
    <div className="video">
      <div>
        <img
          src={video.image}
          className="video__img"
          id={video.id}
          onClick={updateVideoList}
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
