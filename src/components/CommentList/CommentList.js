import '../CommentList/CommentList.scss';
import Comment from '../Comment/Comment';

const CommentList = ({ currentVideo, setCurrentVideo }) => {
  return (
    <section>
      {currentVideo.comments &&
        currentVideo.comments
          .toReversed()
          .map((comment, index) => (
            <Comment
              key={index}
              id={comment.id}
              currentVideo={currentVideo}
              name={comment.name}
              commentTimestamp={comment.timestamp}
              comment={comment.comment}
              likes={comment.likes}
              setCurrentVideo={setCurrentVideo}
            />
          ))}
    </section>
  );
};
export default CommentList;
