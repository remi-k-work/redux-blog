// component css styles
import styles from "./EditCurrentPost.module.css";

// rrd imports
import { redirect, useParams } from "react-router-dom";

// redux stuff
import { store } from "../../app/store";

// posts logic & slice
import { deletePost, updatePost } from "../../features/posts/postsThunks";

// other libraries
import { toast } from "react-toastify";

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

// action
export async function editCurrentPostAction({ params, request }) {
  // Destructure the data that is passed from both the params and the form
  const formData = await request.formData();
  const { action, ...data } = Object.fromEntries(formData);

  const { postId } = params;
  const { postTitle, postAuthor, postContent } = data;

  switch (action) {
    // The user has just updated the current post
    case "updatePost":
      try {
        await store.dispatch(updatePost({ postId, postTitle, postAuthor, postContent })).unwrap();

        // Return to the individual post page to view this recently updated post
        toast.success("The post has been updated!");
        return redirect(`/posts/${postId}`);
      } catch (error) {
        throw new Error("Failed to save the post.");
      }

    // The user has just deleted the current post
    case "deletePost":
      try {
        await store.dispatch(deletePost({ postId })).unwrap();

        // Return to the default posts page
        toast.success("The post has been deleted!");
        return redirect("/posts");
      } catch (error) {
        throw new Error("Failed to delete the post.");
      }
  }
}
