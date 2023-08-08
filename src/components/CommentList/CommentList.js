import '../CommentList/CommentList.scss';
import Comment from '../Comment/Comment';

const CommentList = ({ hero }) => {
  console.log(hero.comments);
  return (
    <section className="aa">
      {hero.comments.map((comment, index) => (
        <Comment
          key={index}
          id={comment.id}
          name={comment.name}
          commentTimestamp={comment.timestamp}
          comment={comment.comment}
          likes={comment.likes}
        />
      ))}
    </section>
  );
};
export default CommentList;
