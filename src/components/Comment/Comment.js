import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Comment/Comment.scss';
import APIService from '../APIService';
import likeIcon from '../../assets/icons/likes.svg';
import commentIcon from '../../assets/icons/comments2.png';
import repostIcon from '../../assets/icons/repost.png';
import likethumbIcon from '../../assets/icons/like2.png';
import moreIcon from '../../assets/icons/more.png';
import deleteIcon from '../../assets/icons/delete.png';
import editIcon from '../../assets/icons/edit.png';

const Comment = ({
  id,
  name,
  commentTimestamp,
  comment,
  likes,
  currentVideo,
  setCurrentVideo,
}) => {
  const [like, setLikes] = useState(likes);
  const [isActive, setActive] = useState('false');
  //-----------------------
  //comment date in Time Ago Format
  const nowDateinSec = Date.now() / 1000;
  const commentTimeStamp = commentTimestamp / 1000;
  const longAgoTimeStamp = nowDateinSec - commentTimeStamp;

  const openCommentMenu = (e) => {
    setActive(!isActive);
    console.log();
    if (!isActive) {
      if (!e.target.matches('.actOnComment')) {
        setActive(!isActive);
      }
    }
  };

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

  //-----------------------
  const handleLike = () => {
    // axios
    //   .put(
    //     `https://project-1-api.herokuapp.com/comments/${id}/like?api_key=<FatemeBagherzadBrainStationAPI>`
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     setLikes(like + 1);
    //   });

    setLikes(like + 1);
  };

  //------------------------
  const deleteCommentHandler = (event) => {
    console.log(event);
    event.preventDefault();
    axios
      .delete(
        `https://project-2-api.herokuapp.com/videos/${currentVideo.id}/comments/${id}?api_key=4e15e296-a8f6-4d61-bffb-cad423b094d8`
      )
      .then(() => {
        APIService.getVideoById(currentVideo.id).then((response) => {
          setCurrentVideo(response);
          if (!isActive) {
            setActive(!isActive);
          }
        });
      });
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
          <span>{like}</span>
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

          <div
            className="comment__commentIcons-wrapper like"
            onClick={handleLike}
          >
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
        <div className={isActive ? 'actOnComment' : null} id="menu">
          <div className="comment__more ">
            <a
              className="comment__more-item"
              href="#"
              onClick={deleteCommentHandler}
            >
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
