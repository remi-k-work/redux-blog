// component css styles
import styles from "./SinglePostView.module.css";

// rrd imports
import { Link } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { selectPostById } from "../postsSelectors";

// other libraries
import { PencilIcon } from "@heroicons/react/24/solid";

// components
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import NotFound from "../../../components/NotFound";

export default function SinglePostView({ postId }) {
  // Global state & dispatch coming from redux
  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return <NotFound message={"Post not found!"} />;
  }

  const { id, title, content, userId, date } = post;

  return (
    <article className={styles["single-post-view"]}>
      <h3 className={styles["single-post-view__title"]}>{title}</h3>
      <p className={styles["single-post-view__content"]}>{content}</p>
      <section className={styles["single-post-view__credit"]}>
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
        <Link className={styles["single-post-view__edit-post"]} to={`/posts/edit/${id}`}>
          <PencilIcon width={24} height={24} />
          Edit
        </Link>
      </section>
      <ReactionButtons post={post} />
    </article>
  );
}
