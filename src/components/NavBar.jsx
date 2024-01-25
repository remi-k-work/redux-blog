// component css styles
import styles from "./NavBar.module.css";

// rrd imports
import { NavLink } from "react-router-dom";

// other libraries
import cn from "classnames";

export default function NavBar() {
  // Customize the navlink's classname prop based on its active status
  const navLinkClassName = ({ isActive }) => (isActive ? cn(styles["navbar__link"], styles["navbar__link--active"]) : styles["navbar__link"]);

  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["navbar__list"]}>
        <li>
          {/* <NavLink className={() => navLinkClassName("/")} unstable_viewTransition to="/">
            Home
          </NavLink> */}
          <NavLink className={navLinkClassName} end to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClassName} end to="posts">
            View All Posts
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClassName} end to="posts/create">
            Create a New Post
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClassName} end to="users">
            View All Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
