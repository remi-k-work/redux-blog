// component css styles
import styles from "./UserExcerpt.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUserById } from "../usersSelectors";

export default function UserExcerpt({ userId, postsCount }) {
  // Global state & dispatch coming from redux
  const user = useSelector((state) => selectUserById(state, userId));

  // If the redux store has not yet been updated with the most recent data
  // (such as when fetching is in progress), the variable may be undefined
  if (!user) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name } = user;

  return (
    <article className={styles["user-excerpt"]}>
      <div className={styles["user-excerpt__background"]}></div>
      <Link className={styles["user-excerpt__avatar"]} to={`/users/${id}`}>
        <img src={`https://doodleipsum.com/100x100/avatar-3?n=${id}`} width={100} height={100} alt="Avatar" />
      </Link>
      <div className={styles["user-excerpt__posts-count"]}>{postsCount}</div>
      <h3 className={styles["user-excerpt__name"]}>
        <Link to={`/users/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}
