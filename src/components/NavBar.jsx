// component css styles
import styles from "./NavBar.module.css";

// rrd imports
import { NavLink, useLocation } from "react-router-dom";

// other libraries
import cn from "classnames";

export default function NavBar() {
  // Get the path of the current url
  const { pathname } = useLocation();

  // Customize the navlink's classname prop based on its active status
  const navLinkClassName = ({ isActive }) => (isActive ? cn(styles["navbar__link"], styles["navbar__link--active"]) : styles["navbar__link"]);

  // The general "posts" navlink has a separate activation logic
  const navLinkClassNamePosts = ({ isActive, ...rest }) => {
    // It would ordinarily match the "/posts/create" pathname, but we do not want two active links at the same time
    if (pathname === "/posts/create") {
      return styles["navbar__link"];
    }

    // Once the above case is excluded, use the regular activation logic
    return navLinkClassName({ ...rest, isActive });
  };

  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["navbar__list"]}>
        <li>
          <NavLink className={navLinkClassName} end to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClassNamePosts} to="posts">
            <span className={styles["navbar__view-all-posts"]}></span>
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClassName} end to="posts/create">
            <span className={styles["navbar__create-a-new-post"]}></span>
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClassName} to="users">
            <span className={styles["navbar__view-all-users"]}></span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
