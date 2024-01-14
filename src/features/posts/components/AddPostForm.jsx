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

export default function AddPostForm() {
  const navigate = useNavigate();

  // Local state for this component that does not have to be shared
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  // Global state & dispatch coming from redux
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  // Handle title change
  function handleTitleChange(ev) {
    setTitle(ev.target.value);
  }

  // Handle author change
  function handleAuthorChange(ev) {
    setUserId(ev.target.value);
  }

  // Handle content change
  function handleContentChange(ev) {
    setContent(ev.target.value);
  }

  // Handle a save post click
  async function handleSavePostClick(ev) {
    // It would be helpful if we could deactivate the "Save Post" button while we wait for the request,
    // so that the user does not unintentionally try to save a post twice
    if (canSavePost) {
      try {
        setAddRequestStatus("pending");
        // A new post has been added by the user
        await dispatch(addNewPost({ title, content, userId })).unwrap();

        // Clear the form
        setTitle("");
        setContent("");
        setUserId("");

        navigate("/posts");
      } catch (error) {
        console.error("Failed to save the post: ", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  }

  // Only activate the save post button after all fields have been filled out and no dispatched requests are pending
  const canSavePost = [title, content, userId].every(Boolean) && addRequestStatus === "idle";

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
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={handleTitleChange} />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={handleAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={handleContentChange} />

        <button type="button" onClick={handleSavePostClick} disabled={!canSavePost}>
          Save Post
        </button>
      </form>
    </section>
  );
}
