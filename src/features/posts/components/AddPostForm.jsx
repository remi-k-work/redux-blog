// component css styles
import styles from "./AddPostForm.module.css";

// react
import { useState } from "react";

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
import { z } from "zod";
import { waait } from "../../../js/helpers";

// components
import FormTextField from "../../../components/FormTextField";

const validationSchema = z.object({
  postTitle: z.string().min(1, { message: "Please enter the title of this post." }),
  postAuthor: z.string().min(1, { message: "Who is the author?" }),
  postContent: z.string().min(1, { message: "Content is a required field." }),
});

export default function AddPostForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validationSchema), defaultValues: { postTitle: "", postAuthor: "", postContent: "" } });

  // Global state & dispatch coming from redux
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  // Handle the form submission
  async function onSubmit(data) {
    // Destructure the form data
    const { postTitle, postAuthor, postContent } = data;

    try {
      // A new post has been added by the user
      await dispatch(addNewPost({ postTitle, postAuthor, postContent })).unwrap();

      // Clear the form
      reset();

      navigate("/posts");
    } catch (error) {
      console.error("Failed to save the post: ", error);
    }
  }

  const usersOptions = users.map((user) => {
    const { id, name } = user;

    return (
      <option key={id} value={id}>
        {name}
      </option>
    );
  });

  return (
    <section className={styles["add-post-form"]}>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextField name={"postTitle"} label={"Post Title:"} register={register} errors={errors} />
        {/* <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" {...register("postTitle")} aria-invalid={errors.postTitle ? "true" : "false"} />
        {errors.postTitle && <p role="alert">{errors.postTitle.message}</p>} */}

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" {...register("postAuthor")} aria-invalid={errors.postAuthor ? "true" : "false"}>
          <option value=""></option>
          {usersOptions}
        </select>
        {errors.postAuthor && <p role="alert">{errors.postAuthor.message}</p>}

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" {...register("postContent")} aria-invalid={errors.postContent ? "true" : "false"} />
        {errors.postContent && <p role="alert">{errors.postContent.message}</p>}

        {/* Only activate the save post button after all fields have been filled out and no dispatched requests are pending */}
        <button type="submit" disabled={isSubmitting}>
          Save Post
        </button>
      </form>
    </section>
  );
}
