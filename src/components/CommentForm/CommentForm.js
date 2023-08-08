import '../CommentForm/CommentForm.scss';
import addCommentIcon from '../../assets/icons/add_comment.svg';
import userImg from '../../assets/images/Mohan-muruge.jpg';

const CommentForm = () => {
  return (
    <>
      <span className="formSection__commentsN">3 Comments</span>

      <form className="formSection">
        <img alt="Person Proflie" src={userImg} className="formSection__img" />
        <div className="formSection__form" id="formSection__form">
          <label for="comment" className="formSection__form--label">
            JOIN THE CONVERSATION
          </label>
          <div className="formSection__form--textBtnWrapper">
            <textarea
              id="comment"
              name="comment"
              placeholder="Add a new comment"
              className="formSection__form--textArea"
              autocomplete="off"
            ></textarea>

            <button className="formSection__form--btn">
              <img
                src={addCommentIcon}
                className="formSection__form--btn-icon"
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
