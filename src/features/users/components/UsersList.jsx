// component css styles
import styles from "./UsersList.module.css";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUsersIds } from "../usersSelectors";

// components
import UserCard from "./UserCard";

export default function UsersList() {
  // Global state & dispatch coming from redux
  const usersIds = useSelector(selectUsersIds);

  return (
    <section className={styles["users-list"]}>
      {usersIds.map((userId) => (
        <UserCard key={userId} userId={userId} />
      ))}
    </section>
  );
}
