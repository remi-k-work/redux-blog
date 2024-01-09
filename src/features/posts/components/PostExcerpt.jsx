// component css styles
import styles from "./PostExcerpt.module.css";

// components
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export default function PostExcerpt({ post }) {
  const { title, content, userId, date } = post;

  return (
    <article className={styles["post-excerpt"]}>
      <h3>{title}</h3>
      <p className={styles["post-content"]}>{content.substring(0, 100)}</p>
      <PostAuthor userId={userId} />
      <TimeAgo timestamp={date} />
      <ReactionButtons post={post} />
    </article>
  );
}
