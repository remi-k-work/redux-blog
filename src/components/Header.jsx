// component css styles
import styles from "./Header.module.css";

// rrd imports
import { NavLink } from "react-router-dom";

// redux stuff
import { useSelector, useDispatch } from "react-redux";

// posts logic & slice
import { getPostsCount } from "../features/posts/postsSelectors";
import { countIncreased } from "../features/posts/postsSlice";

export default function Header() {
  // Global state & dispatch coming from redux
  const count = useSelector(getPostsCount);
  const dispatch = useDispatch();

  return (
    <header className={styles["header"]}>
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="posts">View All Posts</NavLink>
          </li>
          <li>
            <NavLink to="posts/create">Create a New Post</NavLink>
          </li>
          <li>
            <NavLink to="users">View All Users</NavLink>
          </li>
        </ul>
        <button type="button" onClick={() => dispatch(countIncreased())}>
          {count}
        </button>
      </nav>
    </header>
  );
}
