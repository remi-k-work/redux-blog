// component css styles
import styles from "./UserCard.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUserById } from "../usersSelectors";

export default function UserCard({ userId }) {
  // Global state & dispatch coming from redux
  const user = useSelector((state) => selectUserById(state, userId));

  const { id, name, username, email, phone, website, address } = user;

  return (
    <article className={styles["user-card"]}>
      <Link className={styles["user-card__avatar"]} to={`/users/${id}`}>
        <img src={`https://doodleipsum.com/200x200/avatar-3?n=${id}`} width={200} height={200} alt="Avatar" />
      </Link>
      <h2 className={styles["user-card__name"]}>
        <Link to={`/users/${id}`}>{name}</Link>
      </h2>
      <section className={styles["user-card__info"]}>
        <dl>
          <dt>Username</dt>
          <dd>{username}</dd>
          <dt>Email</dt>
          <dd>{email}</dd>
          <dt>Phone</dt>
          <dd>{phone}</dd>
          <dt>Website</dt>
          <dd>{website}</dd>
          <dt>Address</dt>
          <dd>
            <p>
              {address.street} #{address.suite}
            </p>
            <p>
              {address.city}, {address.zipcode}
            </p>
          </dd>
        </dl>
      </section>
    </article>
  );
}
