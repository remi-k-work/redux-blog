// component css styles
import styles from "./PostExcerpt.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { selectPostById } from "../postsSelectors";

// other libraries
import { EyeIcon } from "@heroicons/react/24/solid";

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
      <h2 className={styles["post-excerpt__title"]}>{title}</h2>
      <p className={styles["post-excerpt__content"]}>{content.substring(0, 75)}...</p>
      <section className={styles["post-excerpt__credit"]}>
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
        <Link className={styles["post-excerpt__view-post"]} to={`/posts/${id}`}>
          <EyeIcon width={24} height={24} />
          View
        </Link>
      </section>
      <ReactionButtons post={post} />
    </article>
  );
}
