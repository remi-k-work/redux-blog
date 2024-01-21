// component css styles
import styles from "./PostsList.module.css";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { getPostsStatus, getPostsError, selectPostsIds } from "../postsSelectors";

// components
import PostExcerpt from "./PostExcerpt";

export default function PostsList() {
  // Global state & dispatch coming from redux
  const orderedPostsIds = useSelector(selectPostsIds);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostsIds.map((postId) => <PostExcerpt key={postId} postId={postId} />);
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return <section className={styles["posts-list"]}>{content}</section>;
}
