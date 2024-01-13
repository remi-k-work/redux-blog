// component css styles
import styles from "./UsersList.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectAllUsers } from "../usersSelectors";

export default function UsersList() {
  // Global state & dispatch coming from redux
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => {
    const { id, name } = user;

    return (
      <li key={id}>
        <Link to={`/users/${id}`}>{name}</Link>
      </li>
    );
  });

  return (
    <section className={styles["users-list"]}>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
}
