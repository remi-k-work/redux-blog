// component css styles
import styles from "./PostsList.module.css";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { selectAllPostsOrdered } from "../postsSlice";

// components
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

export default function PostsList() {
  const posts = useSelector(selectAllPostsOrdered);

  const renderedPosts = posts.map((post) => {
    const { id, title, content, userId, date } = post;

    return (
      <article key={id} className={styles["post-excerpt"]}>
        <h3>{title}</h3>
        <p className={styles["post-content"]}>{content.substring(0, 100)}</p>
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
      </article>
    );
  });

  return (
    <section className={styles["posts-list"]}>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}
