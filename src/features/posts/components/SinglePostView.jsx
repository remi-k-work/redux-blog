// component css styles
import styles from "./SinglePostView.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { selectPostById } from "../postsSelectors";

// components
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export default function SinglePostView({ postId }) {
  // Global state & dispatch coming from redux
  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <article>
        <h2>Post not found!</h2>
      </article>
    );
  }

  const { id, title, content, userId, date } = post;

  return (
    <article className={styles["single-post-view"]}>
      <h2>{title}</h2>
      <p className={styles["single-post-view__content"]}>{content}</p>
      <Link to={`/posts/edit/${id}`}>Edit Post</Link>
      <PostAuthor userId={userId} />
      <TimeAgo timestamp={date} />
      <ReactionButtons post={post} />
    </article>
  );
}
