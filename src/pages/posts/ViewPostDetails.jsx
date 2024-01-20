// component css styles
import styles from "./ViewPostDetails.module.css";

// rrd imports
import { useParams } from "react-router-dom";

// components
import SinglePostView from "../../features/posts/components/SinglePostView";

export default function ViewPostDetails() {
  const { postId } = useParams();

  return (
    <article className={styles["view-post-details"]}>
      <SinglePostView postId={postId} />
    </article>
  );
}
