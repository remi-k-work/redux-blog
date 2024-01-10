// component css styles
import styles from "./EditCurrentPost.module.css";

// rrd imports
import { useParams } from "react-router-dom";

// components
import EditPostForm from "../../features/posts/components/EditPostForm";

export default function EditCurrentPost() {
  const { postId } = useParams();

  return (
    <article className={styles["edit-current-post"]}>
      <EditPostForm postId={Number(postId)} />
    </article>
  );
}
