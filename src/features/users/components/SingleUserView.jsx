// component css styles
import styles from "./SingleUserView.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectUserById } from "../usersSelectors";

// posts logic & slice
import { selectAllPostsForUser } from "../../posts/postsSelectors";

// other libraries
import { AtSymbolIcon, GlobeAltIcon, HomeIcon, PencilSquareIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function SingleUserView({ userId }) {
  // Global state & dispatch coming from redux
  const user = useSelector((state) => selectUserById(state, userId));
  const postsForUser = useSelector((state) => selectAllPostsForUser(state, userId));

  if (!user) {
    return (
      <article>
        <h2>User not found!</h2>
      </article>
    );
  }

  const postTitles = postsForUser.map((post) => {
    const { id, title } = post;

    return (
      <li key={id}>
        <Link to={`/posts/${id}`}>{title}</Link>
      </li>
    );
  });

  const { id, name, username, email, phone, website, address } = user;

  return (
    <article className={styles["single-user-view"]}>
      <div className={styles["single-user-view__background"]}></div>
      <div className={styles["single-user-view__avatar"]} to={`/users/${id}`}>
        <img src={`https://doodleipsum.com/300x300/avatar-3?n=${id}`} width={300} height={300} alt="Avatar" />
      </div>
      <h2 className={styles["single-user-view__name"]}>{name}</h2>
      <section className={styles["single-user-view__info"]}>
        <dl>
          <dt>
            <PencilSquareIcon width={48} height={48} />
            <h5>all my posts</h5>
          </dt>
          <dd>
            <ul className={styles["single-user-view__all-my-posts"]}>{postTitles}</ul>
          </dd>
        </dl>
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
