// component css styles
import styles from "./UserCard.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUserById } from "../usersSelectors";

// other libraries
import { AtSymbolIcon, GlobeAltIcon, HomeIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function UserCard({ userId }) {
  // Global state & dispatch coming from redux
  const user = useSelector((state) => selectUserById(state, userId));

  const { id, name, username, email, phone, website, address } = user;

  return (
    <article className={styles["user-card"]}>
      <div className={styles["user-card__background"]}></div>
      <Link className={styles["user-card__avatar"]} to={`/users/${id}`}>
        <img src={`https://doodleipsum.com/200x200/avatar-3?n=${id}`} width={200} height={200} alt="Avatar" />
      </Link>
      <h3 className={styles["user-card__name"]}>
        <Link to={`/users/${id}`}>{name}</Link>
      </h3>
      <section className={styles["user-card__info"]}>
        <dl>
          <dt>
            <UserCircleIcon width={24} height={24} />
            username
          </dt>
          <dd>{username}</dd>
          <dt>
            <AtSymbolIcon width={24} height={24} />
            email
          </dt>
          <dd>{email}</dd>
          <dt>
            <PhoneIcon width={24} height={24} />
            phone
          </dt>
          <dd>{phone}</dd>
          <dt>
            <GlobeAltIcon width={24} height={24} />
            website
          </dt>
          <dd>{website}</dd>
          <dt>
            <HomeIcon width={24} height={24} />
            address
          </dt>
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
