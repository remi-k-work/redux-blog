// component css styles
import styles from "./PostsList.module.css";

// react
import { useEffect } from "react";

// redux stuff
import { useSelector, useDispatch } from "react-redux";

// posts logic & slice
import { fetchPosts, selectAllPostsOrdered, getPostsStatus, getPostsError } from "../postsSlice";

// components
import PostExcerpt from "./PostExcerpt";

export default function PostsList() {
  // Global state & dispatch coming from redux
  const posts = useSelector(selectAllPostsOrdered);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    content = posts.map((post) => <PostExcerpt key={post.id} post={post} />);
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section className={styles["posts-list"]}>
      <h2>Posts</h2>
      {content}
    </section>
  );
}