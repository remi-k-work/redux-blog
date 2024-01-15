// component css styles
import styles from "./PostAuthor.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUserById } from "../../users/usersSelectors";

export default function PostAuthor({ userId }) {
  // Identify the author of this post using the specified user id
  const author = useSelector((state) => selectUserById(state, userId));

  return <span className={styles["post-author"]}>by {author ? <Link to={`/users/${userId}`}>{author.name}</Link> : "Unknown author"}</span>;
}
