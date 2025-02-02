import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Comment/Comment.scss';

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
  const [isActive, setActive] = useState('false');
  const [isEditing, setIsEditing] = useState('false');
  const [textareaV, setTextareaV] = useState('');
  const { videoId } = useParams();
  //comment date in Time Ago Format------------
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

  const openCommentMenu = (e) => {
    setActive(!isActive);
  };

  const editPostHandler = (event) => {
    event.preventDefault();
    setTextareaV(comment);
    setIsEditing(false);
    setActive(true);
  };

  const editPostCommentHandler = (event) => {
    event.preventDefault();
    axios
      .patch('http://localhost:8888/videos/' + currentVideo.id, {
        headers: {},
        data: {
          id: id,
          user: name,
          comment: `${event.target.editComment.value}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCurrentVideo(response.data);
      })
      .catch((err) => console.log(err));

    setIsEditing(true);
  };

  const likeCommentHandler = () => {
    axios
      .patch('http://localhost:8888/videos/' + currentVideo.id, {
        headers: {},
        data: {
          id: id,
          likes: likes * 1 + 1,
        },
      })
      .then((response) => {
        setCurrentVideo(response.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteCommentHandler = (event) => {
    event.preventDefault();
    axios
      .delete('http://localhost:8888/videos/' + currentVideo.id, {
        headers: {},
        data: {
          idToDelete: id,
        },
      })
      .then((response) => {
        console.log(response);
        setCurrentVideo(response.data);
        if (!isActive) {
          setActive(!isActive);
        }
      })
      .catch((err) => console.log(err));
  };

  //close the input or dropUp menu with Esc---
  document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key === 'Escape') {
      setIsEditing(true);
    }
    if (key === 'Escape' && isActive) {
      setActive(true);
    }
  });

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
            <p
              className="comment__TxtWrapper--p"
              id={!isEditing ? 'showEditBox' : null}
            >
              {comment}
            </p>
            <form
              className="comment__TxtWrapper--edit"
              id={isEditing ? 'showEditBox' : null}
              onSubmit={editPostCommentHandler}
            >
              <textarea
                id="editComment"
                name="editComment"
                type="text"
                placeholder=""
                defaultValue={textareaV}
                className="comment__TxtWrapper--edit-textarea"
              ></textarea>
              <button className="comment__TxtWrapper--edit-btn btn">
                Save
              </button>
            </form>
          </div>
        </div>

        <span className="comment__likeCounter">
          <span className="comment__likeCounter-heart">
            <img src={likeIcon} alt="Like Icon" />
          </span>
          <span>{likes}</span>
        </span>

        {/* action on comments Icons */}
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
            onClick={likeCommentHandler}
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
        <div className={isActive ? 'actOnComment' : null}>
          <div className="comment__more ">
            <span className="comment__more-item" onClick={deleteCommentHandler}>
              <img
                src={deleteIcon}
                className="comment__commentIcons-icon"
                alt="Delete Icon"
              />
              <span> Delete post </span>
            </span>
            <span className="comment__more-item" onClick={editPostHandler}>
              <img
                src={editIcon}
                className="comment__commentIcons-icon"
                alt="Edit Icon"
              />
              <span>Edit post</span>
            </span>
            <span className="comment__more-item" id="repost">
              <img
                src={repostIcon}
                className="comment__commentIcons-icon"
                alt="Repost Icon"
              />
              <span>Repost</span>
            </span>
          </div>
        </div>
      </div>

      <hr className="comment__hr" />
    </div>
  );
};
export default Comment;
