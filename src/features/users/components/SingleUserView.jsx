// component css styles
import styles from "./SingleUserView.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUserById } from "../usersSelectors";

// posts logic & slice
import { selectAllPostsForUser } from "../../posts/postsSelectors";

export default function SingleUserView({ userId }) {
  // Global state & dispatch coming from redux
  const user = useSelector((state) => selectUserById(state, userId));
  const postsForUser = useSelector((state) => selectAllPostsForUser(state, userId));

  if (!user) {
    return (
      <article>
        <h2>User not found!</h2>
      </article>
    );
  }

  const postTitles = postsForUser.map((post) => {
    const { id, title } = post;

    return (
      <li key={id}>
        <Link to={`/posts/${id}`}>{title}</Link>
      </li>
    );
  });

  const { name } = user;

  return (
    <article className={styles["single-user-view"]}>
      <h2>{name}</h2>
      <ul>{postTitles}</ul>
    </article>
  );
}
