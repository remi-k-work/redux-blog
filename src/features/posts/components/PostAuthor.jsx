// component css styles
import styles from "./PostAuthor.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUserById } from "../../users/usersSelectors";

// other libraries
import { UserIcon } from "@heroicons/react/24/solid";

export default function PostAuthor({ userId }) {
  // Identify the author of this post using the specified user id
  const author = useSelector((state) => selectUserById(state, userId));

  return (
    <span className={styles["post-author"]}>
      {author ? (
        <Link to={`/users/${userId}`}>
          <span className={styles["post-author__name"]}>
            <UserIcon width={24} height={24} />
            {author.name}
          </span>
        </Link>
      ) : (
        <span className={styles["post-author__name"]}>
          <UserIcon width={24} height={24} />
          "Unknown author"
        </span>
      )}
    </span>
  );
}
