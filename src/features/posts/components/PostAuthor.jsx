// component css styles
import styles from "./PostAuthor.module.css";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUserById } from "../../users/usersSlice";

export default function PostAuthor({ userId }) {
  // Identify the author of this post using the specified user id
  const author = useSelector((state) => selectUserById(state, userId));

  return <span className={styles["post-author"]}>by {author ? author.name : "Unknown author"}</span>;
}
