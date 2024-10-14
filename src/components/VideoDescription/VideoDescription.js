import './VideoDescription.scss';
import viewsIcon from '../../assets/icons/views.svg';
import likeIcon from '../../assets/icons/likes.svg';

const VideoDescription = ({ currentVideo }) => {
  let timestmp = new Date(currentVideo.timestamp);
  let dateFinalFormat =
    timestmp.getDate() +
    '/' +
    (timestmp.getMonth() + 1) +
    '/' +
    timestmp.getFullYear();

  return (
    <>
      <div className="VideoDes">
        <h1 className="VideoDes__title">{currentVideo.title}</h1>

        <div className="VideoDes__info">
          <div className="VideoDes__info-left">
            <span className="VideoDes__info-left-item VideoDes__info-left-item-channel">
              By {currentVideo.channel}
            </span>
            <span className="VideoDes__info-left-item">{dateFinalFormat}</span>
          </div>

          <div className="VideoDes__info-right">
            <span className="VideoDes__info-right-item">
              <img src={viewsIcon} alt="View Icon" />
              {currentVideo.views}
            </span>
            <span className="VideoDes__info-right-item">
              <img src={likeIcon} alt="Like Icon" />
              {currentVideo.likes}
            </span>
          </div>
        </div>
        <hr />
        <p className="VideoDes__description">{currentVideo.description}</p>
      </div>
    </>
  );
};
export default VideoDescription;
