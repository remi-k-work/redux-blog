// component css styles
import styles from "./EditPostForm.module.css";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux stuff
import { useSelector, useDispatch } from "react-redux";

// posts logic & slice
import { selectPostById } from "../postsSelectors";
import { updatePost, deletePost } from "../postsThunks";

// users logic & slice
import { selectAllUsers } from "../../users/usersSelectors";

// other libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waait } from "../../../js/helpers";
import { validationSchema } from "../postFormValidation";

// components
import FormTextField from "../../../components/FormTextField";
import FormSelectField from "../../../components/FormSelectField";
import FormTextArea from "../../../components/FormTextArea";

export default function EditPostForm({ postId }) {
  // Global state & dispatch coming from redux
  const post = useSelector((state) => selectPostById(state, postId));
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: { postTitle: post?.title, postAuthor: String(post?.userId), postContent: post?.content },
  });

  if (!post) {
    return (
      <article>
        <h2>Post not found!</h2>
      </article>
    );
  }

  // Handle the form submission
  async function onSubmit(data) {
    // Destructure the form data
    const { postTitle, postAuthor, postContent } = data;

    try {
      // The user has just updated the current post
      await dispatch(updatePost({ postId, postTitle, postAuthor, postContent })).unwrap();

      // Clear the form
      reset();

      // Return to the individual post page to view this recently updated post
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Failed to save the post: ", error);
    }
  }

  // Handle a delete post click
  async function handleDeletePostClick(ev) {
    try {
      // The user has just deleted the current post
      await dispatch(deletePost({ postId })).unwrap();

      // Clear the form
      reset();

      // Return to the default posts page
      navigate("/posts");
    } catch (error) {
      console.error("Failed to delete the post: ", error);
    }
  }

  return (
    <section className={styles["edit-post-form"]}>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextField name={"postTitle"} label={"Post Title:"} register={register} errors={errors} />
        <FormSelectField name={"postAuthor"} label={"Author:"} register={register} errors={errors}>
          <option value=""></option>
          {users.map((user) => {
            const { id, name } = user;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </FormSelectField>
        <FormTextArea name={"postContent"} label={"Content:"} register={register} errors={errors} />

        {/* Only activate the save post button when no requests are pending */}
        <button type="submit" disabled={isSubmitting}>
          Save Post
        </button>
        <button type="button" onClick={handleDeletePostClick}>
          Delete Post
        </button>
      </form>
    </section>
  );
}
