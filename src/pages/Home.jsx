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

// assets
import blogger from "../assets/blogger.png";

export default function Home() {
  // Global state & dispatch coming from redux
  const numberOfPosts = useSelector(getNumberOfPosts);
  const numberOfUsers = useSelector(getNumberOfUsers);
  const postsPerUserId = useSelector(countPostsPerUserId);
  const orderedPostsIds = useSelector(selectPostsIds);

  return (
    <article className={styles["home"]}>
      <header className={styles["home__hero"]}>
        <h3>What is on your mind today?</h3>
        <section>
          <img src={blogger} width={591} height={640} alt="Blogger" />
          <p>
            Let your thoughts take flight and join our vibrant blogging community. Unleash your creativity and connect with like-minded individuals. Have a
            story to tell? An idea that's bubbling up inside? Our platform provides a space for you to express yourself freely and connect with others who share
            your passions.
          </p>
        </section>
      </header>

      <article className={styles["home__dashboard"]}>
        <section className={styles["dashboard__most-active-users"]}>
          <h4>Most Active Users</h4>
          {postsPerUserId.slice(0, 3).map((data) => {
            const { userId, postsCount } = data;
            return <UserExcerpt key={userId} userId={userId} postsCount={postsCount} />;
          })}
        </section>

        <section className={styles["dashboard__latest-posts"]}>
          <h4>Latest Posts</h4>
          {orderedPostsIds.slice(0, 3).map((postId) => (
            <PostPreview key={postId} postId={postId} />
          ))}
        </section>

        <article className={styles["dashboard__totals"]}>
          <section className={styles["dashboard-totals__total-posts"]}>
            <h4>Total Posts</h4>
            <h5>{numberOfPosts}</h5>
          </section>

          <section className={styles["dashboard-totals__total-users"]}>
            <h4>Total Users</h4>
            <h5>{numberOfUsers}</h5>
          </section>
        </article>
      </article>
    </article>
  );
}
