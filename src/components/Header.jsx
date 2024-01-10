// component css styles
import styles from "./Header.module.css";

// rrd imports
import { NavLink } from "react-router-dom";

export default function Header() {
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
      </nav>
    </header>
  );
}
