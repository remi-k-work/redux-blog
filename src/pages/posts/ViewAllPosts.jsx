// component css styles
import styles from "./ViewAllPosts.module.css";

// components
import PostsList from "../../features/posts/components/PostsList";

export default function ViewAllPosts() {
  return (
    <article className={styles["view-all-posts"]}>
      <PostsList />
    </article>
  );
}
