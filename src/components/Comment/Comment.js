import '../Comment/Comment.scss';
import likeIcon from '../../assets/icons/likes.svg';
import commentIcon from '../../assets/icons/comments2.png';
import repostIcon from '../../assets/icons/repost.png';
import likethumbIcon from '../../assets/icons/like2.png';
import moreIcon from '../../assets/icons/more.png';
import deleteIcon from '../../assets/icons/delete.png';
import editIcon from '../../assets/icons/edit.png';
import { useState } from 'react';

const Comment = ({ id, name, commentTimestamp, comment, likes }) => {
  //-----------------------
  //comment date in Time Ago Format
  const nowDateinSec = Date.now() / 1000;
  const commentTimeStamp = commentTimestamp / 1000;
  const longAgoTimeStamp = nowDateinSec - commentTimeStamp;

  const timeAgo = () => {
    if (longAgoTimeStamp / 31536000 >= 1) {
      return `${Math.ceil(longAgoTimeStamp / 31536000)} years ago`;
    } else if (longAgoTimeStamp / 2592000 >= 1) {
      return `${Math.ceil(longAgoTimeStamp / 2592000)} month ago`;
    } else if (longAgoTimeStamp / 604800 >= 1) {
      return `${Math.ceil(longAgoTimeStamp / 604800)} weeks ago`;
    } else if (longAgoTimeStamp / 86400 >= 1) {
      return `${Math.ceil(longAgoTimeStamp / 86400)} days ago`;
    } else if (longAgoTimeStamp / 3600 >= 1) {
      return `${Math.ceil(longAgoTimeStamp / 3600)} hours ago`;
    } else if (longAgoTimeStamp / 60 >= 1) {
      return `${Math.ceil(longAgoTimeStamp / 60)} minutes ago`;
    } else {
      return `just now`;
    }
  };

  //-------------------------------------------------
  //comment date in dd/mm/yyy format
  // let timestmp = new Date(commentTimestamp);
  // let dateFinalFormat =
  //   timestmp.getDate() +
  //   '/' +
  //   (timestmp.getMonth() + 1) +
  //   '/' +
  //   timestmp.getFullYear();
  //---------------------------------
  //function for comment side menu
  const [isActive, setActive] = useState('false');
  const openCommentMenu = () => {
    setActive(!isActive);
  };

  return (
    <div>
      <div className="comment">
        <div className="comment__imgTxtContainer">
          <div className="comment__img"></div>

          <div className="comment__TxtWrapper">
            <div className="comment__TxtWrapper--userInfo">
              <span className="comment__TxtWrapper--userInfo-userN">
                {name}
              </span>
              <span className="comment__TxtWrapper--userInfo-date">
                {timeAgo()}
              </span>
            </div>
            <p className="comment__TxtWrapper--p">{comment}</p>
          </div>
        </div>

        <span className="comment__likeCounter">
          <span className="comment__likeCounter-heart">
            <img src={likeIcon} alt="Like Icon" />
          </span>
          <span>{likes}</span>
        </span>

        <div className="comment__commentIcons">
          <div className="comment__commentIcons-wrapper">
            <img
              src={commentIcon}
              className="comment__commentIcons-icon"
              alt="Comment Icon"
            />
            <span>Comment</span>
          </div>

          <div className="comment__commentIcons-wrapper" id="repostm">
            <img
              src={repostIcon}
              className="comment__commentIcons-icon"
              alt="Repost Icon"
            />
            <span>Repost</span>
          </div>

          <div className="comment__commentIcons-wrapper like">
            <img
              src={likethumbIcon}
              className="comment__commentIcons-icon"
              alt="Thums Up Icon"
            />
            <span>Like</span>
          </div>

          <div
            className="comment__commentIcons-wrapper"
            id="dropUp"
            onClick={openCommentMenu}
          >
            <img
              src={moreIcon}
              className="comment__commentIcons-icon"
              alt="More Icon"
            />
          </div>
        </div>

        {/* drop Up menu fpr comments */}
        <div id={isActive ? 'actOnComment' : null}>
          <div className="comment__more ">
            <a className="comment__more-item" href="#">
              <img
                src={deleteIcon}
                className="comment__commentIcons-icon"
                alt="Delete Icon"
              />
              <span> Delete post </span>
            </a>
            <a className="comment__more-item" href="#">
              <img
                src={editIcon}
                className="comment__commentIcons-icon"
                alt="Edit Icon"
              />
              <span>Edit post</span>
            </a>
            <a className="comment__more-item" id="repost" href="#">
              <img
                src={repostIcon}
                className="comment__commentIcons-icon"
                alt="Repost Icon"
              />
              <span>Repost</span>
            </a>
          </div>
        </div>
      </div>

      <hr className="comment__hr" />
    </div>
  );
};
export default Comment;
