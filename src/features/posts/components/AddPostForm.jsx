// component css styles
import styles from "./AddPostForm.module.css";

// rrd imports
import { Form, useNavigation, useSubmit } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";

// users logic & slice
import { selectAllUsers } from "../../users/usersSelectors";

// other libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waait } from "../../../js/helpers";
import { validationSchema } from "../postFormValidation";
import { HandThumbUpIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

// components
import FormTextField from "../../../components/FormTextField";
import FormSelectField from "../../../components/FormSelectField";
import FormTextArea from "../../../components/FormTextArea";

export default function AddPostForm() {
  // Global state & dispatch coming from redux
  const users = useSelector(selectAllUsers);

  const { state } = useNavigation();
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validationSchema) });

  return (
    <section className={styles["add-post-form"]}>
      <h2>
        <PencilSquareIcon width={64} height={64} />
        Add a New Post
      </h2>

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
          defaultValue={""}
        />
        <FormSelectField name={"postAuthor"} label={"Author"} register={register} errors={errors} defaultValue={""}>
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
          defaultValue={""}
        />

        <div className={styles["add-post-form__submit"]}>
          {/* This section is required by rrd to determine which submission button was clicked */}
          {/* Using <button type="submit" name="action" value={"action name"} /> does not work well with react hook form */}
          <input type="text" {...register("action")} hidden={true} />

          {/* Only activate the save post button when no requests are pending */}
          <button type="submit" onClick={() => setValue("action", "addNewPost")} disabled={state !== "idle"}>
            <HandThumbUpIcon width={24} height={24} />
            Save Post
          </button>
        </div>
      </Form>
    </section>
  );
}
