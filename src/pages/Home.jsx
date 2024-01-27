// component css styles
import styles from "./Home.module.css";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { getNumberOfPosts, countPostsPerUserId, selectPostsIds } from "../features/posts/postsSelectors";

// users logic & slice
import { getNumberOfUsers } from "../features/users/usersSelectors";

// components
import UserExcerpt from "../features/users/components/UserExcerpt";
import PostPreview from "../features/posts/components/PostPreview";

export default function Home() {
  // Global state & dispatch coming from redux
  const numberOfPosts = useSelector(getNumberOfPosts);
  const numberOfUsers = useSelector(getNumberOfUsers);
  const postsPerUserId = useSelector(countPostsPerUserId);
  const orderedPostsIds = useSelector(selectPostsIds);

  return (
    <article className={styles["home"]}>
      <h3>What is on your mind today?</h3>
      <article className={styles["home__dashboard"]}>
        <section className={styles["most-active-users"]}>
          <h4>Most Active Users</h4>
          {postsPerUserId.slice(0, 3).map((data) => {
            const { userId, postsCount } = data;
            return <UserExcerpt key={userId} userId={userId} postsCount={postsCount} />;
          })}
        </section>

        <section className={styles["latest-posts"]}>
          <h4>Latest Posts</h4>
          {orderedPostsIds.slice(0, 3).map((postId) => (
            <PostPreview key={postId} postId={postId} />
          ))}
        </section>

        <div>
          <section className={styles["total-posts"]}>
            <h4>Total Posts</h4>
            <h5>{numberOfPosts}</h5>
          </section>

          <section className={styles["total-users"]}>
            <h4>Total Users</h4>
            <h5>{numberOfUsers}</h5>
          </section>
        </div>
      </article>
    </article>
  );
}
