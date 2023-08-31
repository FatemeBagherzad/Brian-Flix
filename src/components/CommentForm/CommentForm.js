import '../CommentForm/CommentForm.scss';
import addCommentIcon from '../../assets/icons/add_comment.svg';
import userImg from '../../assets/images/Mohan-muruge.jpg';

const CommentForm = ({ commentSubmitHandler }) => {
  return (
    <>
      <span className="formSection__commentsN">Comments</span>

      <form className="formSection" onSubmit={commentSubmitHandler}>
        <img alt="Person Proflie" src={userImg} className="formSection__img" />
        <div className="formSection__form" id="formSection__form">
          <label className="formSection__form--label">
            JOIN THE CONVERSATION
          </label>
          <div className="formSection__form--textBtnWrapper">
            <textarea
              id="comment"
              name="comment"
              type="text"
              placeholder="Add a new comment"
              className="formSection__form--textArea"
            ></textarea>

            <button className="formSection__form--btn">
              <img
                src={addCommentIcon}
                className="formSection__form--btn-icon"
                alt="Plus Icon"
              />
              COMMENT
            </button>
          </div>
        </div>
      </form>

      <hr />
    </>
  );
};
export default CommentForm;
