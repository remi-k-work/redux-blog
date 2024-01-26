// component css styles
import styles from "./Home.module.css";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { getNumberOfPosts, countPostsPerUserId } from "../features/posts/postsSelectors";

// users logic & slice
import { getNumberOfUsers } from "../features/users/usersSelectors";

// components
import UserExcerpt from "../features/users/components/UserExcerpt";

export default function Home() {
  // Global state & dispatch coming from redux
  const numberOfPosts = useSelector(getNumberOfPosts);
  const numberOfUsers = useSelector(getNumberOfUsers);
  const postsPerUserId = useSelector(countPostsPerUserId);

  return (
    <article className={styles["home"]}>
      <h2>What is on your mind today?</h2>
      <section>
        <h3>Total Posts</h3>
        {numberOfPosts}
      </section>
      <section>
        <h3>Total Users</h3>
        {numberOfUsers}
      </section>
      <section className={styles["top3-users"]}>
        <h3>Top 3 Most Active Users</h3>
        {postsPerUserId.slice(0, 3).map((data) => {
          const { userId, postsCount } = data;
          return <UserExcerpt key={userId} userId={userId} postsCount={postsCount} />;
        })}
      </section>
    </article>
  );
}
