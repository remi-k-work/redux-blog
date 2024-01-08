// component css styles
import styles from "./AddPostForm.module.css";

// react
import { useState } from "react";

// redux stuff
import { useSelector, useDispatch } from "react-redux";

// posts logic & slice
import { postAdded } from "../postsSlice";

// users logic & slice
import { selectAllUsers } from "../../users/usersSlice";

export default function AddPostForm() {
  // Local state for this component that does not have to be shared
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  // Global state coming from redux
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
  function handleSavePostClick(ev) {
    // Ensure that both the title and the content are provided
    if (title && content) {
      // A new post has been added by the user
      dispatch(postAdded(title, content, userId));

      // Clear the form
      setTitle("");
      setContent("");
    }
  }

  // Only enable the save post button when all of the fields have been filled out
  const canSavePost = Boolean(title) && Boolean(content) && Boolean(userId);

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
