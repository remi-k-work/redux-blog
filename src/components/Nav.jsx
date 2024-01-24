// component css styles
import styles from "./Nav.module.css";

// rrd imports
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className={styles["nav"]}>
      <ul className={styles["nav-list"]}>
        <li>
          <NavLink className={({ isActive }) => (isActive ? styles["nav-list__active"] : "")} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? styles["nav-list__active"] : "")} to="posts">
            View All Posts
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? styles["nav-list__active"] : "")} to="posts/create">
            Create a New Post
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? styles["nav-list__active"] : "")} to="users">
            View All Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
