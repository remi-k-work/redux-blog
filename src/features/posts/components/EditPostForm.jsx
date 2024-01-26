// component css styles
import styles from "./EditPostForm.module.css";

// rrd imports
import { Form, useNavigation, useSubmit } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// posts logic & slice
import { selectPostById } from "../postsSelectors";

// users logic & slice
import { selectAllUsers } from "../../users/usersSelectors";

// other libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waait } from "../../../js/helpers";
import { validationSchema } from "../postFormValidation";
import { HandThumbUpIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

// components
import FormTextField from "../../../components/FormTextField";
import FormSelectField from "../../../components/FormSelectField";
import FormTextArea from "../../../components/FormTextArea";

export default function EditPostForm({ postId }) {
  // Global state & dispatch coming from redux
  const post = useSelector((state) => selectPostById(state, postId));
  const users = useSelector(selectAllUsers);

  const { state } = useNavigation();
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validationSchema) });

  return !post ? (
    <article>
      <h3>Post not found!</h3>
    </article>
  ) : (
    <section className={styles["edit-post-form"]}>
      <h3>
        <PencilSquareIcon width={64} height={64} />
        Edit Post
      </h3>

      {/* To make the react hook form work, we must call handle submit while passing the form submission handling to rrd */}
      <Form onSubmit={handleSubmit((data, ev) => submit(ev.target))} method="post">
        <FormTextField
          name={"postTitle"}
          label={"Post Title"}
          register={register}
          errors={errors}
          size={40}
          maxLength={50}
          spellCheck={"true"}
          autoComplete={"off"}
          defaultValue={post?.title}
        />
        <FormSelectField name={"postAuthor"} label={"Author"} register={register} errors={errors} defaultValue={post?.userId}>
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
        <FormTextArea
          name={"postContent"}
          label={"Content"}
          register={register}
          errors={errors}
          cols={50}
          rows={6}
          spellCheck="true"
          autoComplete={"off"}
          defaultValue={post?.content}
        />

        <div className={styles["edit-post-form__submit"]}>
          {/* This section is required by rrd to determine which submission button was clicked */}
          {/* Using <button type="submit" name="action" value={"action name"} /> does not work well with react hook form */}
          <input type="text" {...register("action")} hidden={true} />

          {/* Only activate the save post button when no requests are pending */}
          <button type="submit" onClick={() => setValue("action", "updatePost")} disabled={state !== "idle"}>
            <HandThumbUpIcon width={24} height={24} />
            Save Post
          </button>

          {/* To avoid form validation, we use type="button" and submit the form ourself */}
          <button
            type="button"
            onClick={(ev) => {
              setValue("action", "deletePost");
              submit(ev.target.form);
            }}
            className={styles["edit-post-form__delete"]}
            disabled={state !== "idle"}
          >
            <TrashIcon width={24} height={24} />
            Delete Post
          </button>
        </div>
      </Form>
    </section>
  );
}
