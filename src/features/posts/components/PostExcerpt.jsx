// component css styles
import styles from "./PostExcerpt.module.css";

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

export default function PostExcerpt({ postId }) {
  // Global state & dispatch coming from redux
  const post = useSelector((state) => selectPostById(state, postId));

  const { id, title, content, userId, date } = post;

  return (
    <article className={styles["post-excerpt"]}>
      <h2>{title}</h2>
      <p className={styles["post-excerpt__content"]}>{content.substring(0, 75)}...</p>
      <Link to={`/posts/${id}`}>View Post</Link>
      <PostAuthor userId={userId} />
      <TimeAgo timestamp={date} />
      <ReactionButtons post={post} />
    </article>
  );
}
