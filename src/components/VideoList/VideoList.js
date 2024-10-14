import { Link } from 'react-router-dom';
import Video from '../Video/Video';
import '../VideoList/VideoList.scss';

const VideoList = ({ videos, currentVideo }) => {
  const allVideosButCurrent = videos.filter(
    (obj) => obj.id !== currentVideo.id
  );

  return (
    <section className="videoList">
      {allVideosButCurrent &&
        allVideosButCurrent.map((video, index) => {
          return (
            <Link to={`/video/${video.id}`} key={index + video.id}>
              <Video video={video} />
            </Link>
          );
        })}
    </section>
  );
};
export default VideoList;
<section></section>;
