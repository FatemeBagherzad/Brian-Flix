import '../Video/Video.scss';

const Video = ({ id, image, title, channel, updateVideoList }) => {
  return (
    <div className="video">
      <div>
        <img
          src={image}
          className="video__img"
          id={id}
          onClick={updateVideoList}
        />
      </div>
      <div className="video__txtCont">
        <p className="video__txtCont-header">{title}</p>
        <p className="video__txtCont-p">{channel}</p>
      </div>
    </div>
  );
};
export default Video;
