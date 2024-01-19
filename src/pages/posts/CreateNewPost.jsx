// component css styles
import styles from "./CreateNewPost.module.css";

// rrd imports
import { redirect } from "react-router-dom";

// redux stuff
import { store } from "../../app/store";

// posts logic & slice
import { addNewPost } from "../../features/posts/postsThunks";

// other libraries
import { toast } from "react-toastify";

// components
import AddPostForm from "../../features/posts/components/AddPostForm";

export default function CreateNewPost() {
  return (
    <article className={styles["create-new-post"]}>
      <AddPostForm />
    </article>
  );
}

// action
export async function createNewPostAction({ request }) {
  // Destructure the data that is passed from both the params and the form
  const formData = await request.formData();
  const { action, ...data } = Object.fromEntries(formData);

  const { postTitle, postAuthor, postContent } = data;

  switch (action) {
    // A new post has been added by the user
    case "addNewPost":
      try {
        await store.dispatch(addNewPost({ postTitle, postAuthor, postContent })).unwrap();

        // Return to the default posts page
        toast.success(`Post "${postTitle}" created!`);
        return redirect("/posts");
      } catch (error) {
        throw new Error("Failed to save the post.");
      }
  }
}
