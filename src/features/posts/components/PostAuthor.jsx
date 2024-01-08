// component css styles
import styles from "./PostAuthor.module.css";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectAllUsers } from "../../users/usersSlice";

export default function PostAuthor({ userId }) {
  // Global state coming from redux
  const users = useSelector(selectAllUsers);

  // Identify the author of this post using the specified user id
  const author = users.find((user) => user.id === userId);

  return <span className={styles["post-author"]}>by {author ? author.name : "Unknown author"}</span>;
}
