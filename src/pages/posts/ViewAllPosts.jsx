// component css styles
import styles from "./ViewAllPosts.module.css";

// components
import PostsList from "../../features/posts/components/PostsList";
import SearchPanel from "../../features/search/components/SearchPanel";

export default function ViewAllPosts() {
  return (
    <article className={styles["view-all-posts"]}>
      <SearchPanel />
      <PostsList />
    </article>
  );
}
