// component css styles
import styles from "./CreateNewPost.module.css";

// components
import AddPostForm from "../../features/posts/components/AddPostForm";

export default function CreateNewPost() {
  return (
    <article className={styles["create-new-post"]}>
      <AddPostForm />
    </article>
  );
}
