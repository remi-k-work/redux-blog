// component css styles
import styles from "./PostPreview.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { selectPostById } from "../postsSelectors";

// other libraries
import { EyeIcon } from "@heroicons/react/24/solid";

export default function PostPreview({ postId }) {
  // Global state & dispatch coming from redux
  const post = useSelector((state) => selectPostById(state, postId));

  const { id, content } = post;

  return (
    <article className={styles["post-preview"]}>
      <p className={styles["post-preview__content"]}>{content.substring(0, 50)}...</p>
      <Link className={styles["post-preview__view-post"]} to={`/posts/${id}`}>
        <EyeIcon width={24} height={24} />
        View
      </Link>
    </article>
  );
}
