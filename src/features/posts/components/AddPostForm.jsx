// component css styles
import styles from "./AddPostForm.module.css";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux stuff
import { useSelector, useDispatch } from "react-redux";

// posts logic & slice
import { addNewPost } from "../postsThunks";

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

export default function AddPostForm() {
  // Global state & dispatch coming from redux
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validationSchema), defaultValues: { postTitle: "", postAuthor: "", postContent: "" } });

  // Handle the form submission
  async function onSubmit(data) {
    // Destructure the form data
    const { postTitle, postAuthor, postContent } = data;

    try {
      // A new post has been added by the user
      await dispatch(addNewPost({ postTitle, postAuthor, postContent })).unwrap();

      // Clear the form
      reset();

      // Return to the default posts page
      navigate("/posts");
    } catch (error) {
      console.error("Failed to save the post: ", error);
    }
  }

  return (
    <section className={styles["add-post-form"]}>
      <h2>Add a New Post</h2>
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
      </form>
    </section>
  );
}
