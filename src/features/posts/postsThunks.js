// redux stuff
import { createAsyncThunk } from "@reduxjs/toolkit";

// other libraries
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  // The payload creator receives the partial `{title, content, userId}` object
  async (initialPost) => {
    // Destructure the payload
    const { postTitle, postAuthor, postContent } = initialPost;

    // We send the initial data to the fake api server
    // However, ensure that we are adhering to the server's schema and required data types
    // Input => { title: "foo", body: "bar", userId: 1 };
    const reqData = { title: postTitle, body: postContent, userId: Number(postAuthor) };
    const response = await axios.post(POSTS_URL, reqData);

    // Output <= { id: 101, title: "foo", body: "bar", userId: 1 };
    return response.data;
  }
);

export const updatePost = createAsyncThunk("posts/updatePost", async (initialPost) => {
  // Destructure the payload
  const { postId, title, content, userId } = initialPost;

  // We send the initial data to the fake api server
  // However, ensure that we are adhering to the server's schema and required data types
  // Input => { id: 1, title: "foo", body: "bar", userId: 1 };
  const reqData = { id: Number(postId), title: title, body: content, userId: Number(userId) };

  try {
    const response = await axios.put(`${POSTS_URL}/${postId}`, reqData);

    // Output <= { id: 1, title: "foo", body: "bar", userId: 1 };
    return response.data;
  } catch (error) {
    // When we attempt to update posts with ids > 100, the fake api server returns an error
    return reqData;
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (initialPost) => {
  // Destructure the payload
  const { postId } = initialPost;

  await axios.delete(`${POSTS_URL}/${postId}`);

  // Output <= { id: 1 };
  return { id: postId };
});
