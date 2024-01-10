// component css styles
import styles from "./Home.module.css";

// components
import AddPostForm from "../features/posts/components/AddPostForm";
import PostsList from "../features/posts/components/PostsList";

export default function Home() {
  return (
    <article className={styles["home"]}>
      <AddPostForm />
      <PostsList />
    </article>
  );
}
