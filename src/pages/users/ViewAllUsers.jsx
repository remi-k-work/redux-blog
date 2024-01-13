// component css styles
import styles from "./ViewAllUsers.module.css";

// components
import UsersList from "../../features/users/components/UsersList";

export default function ViewAllUsers() {
  return (
    <article className={styles["view-all-users"]}>
      <UsersList />
    </article>
  );
}
