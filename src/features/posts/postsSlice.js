// redux stuff
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

// other libraries
import axios from "axios";
import { sub } from "date-fns";

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
    const { title, content, userId } = initialPost;

    // We send the initial data to the fake api server
    // However, ensure that we are adhering to the server's schema and required data types
    const reqData = { title: title, body: content, userId: Number(userId) };
    const response = await axios.post(POSTS_URL, reqData);

    // The response includes the complete post object, including the unique id
    return response.data;
  }
);

const initialState = {
  posts: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // A new post has been added by the user
    postAdded: {
      reducer(state, action) {
        // Destructure the payload
        const newPost = action.payload;

        state.posts.push(newPost);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,

            // Store the user id as a number rather than a string
            userId: Number(userId),

            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        };
      },
    },

    // The user added a reaction emoji to the post
    reactionAdded(state, action) {
      // Destructure the payload
      const { postId, reaction } = action.payload;

      // Update a matching counter field for the clicked emoji
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";

      // Destructure the payload
      const loadedPosts = action.payload;

      // Allow the fetched posts to form our array of posts
      state.posts = loadedPosts.map((loadedPost) => {
        // But only if they agree with our own schema first
        return {
          id: loadedPost.id,
          title: loadedPost.title,
          content: loadedPost.body,
          userId: loadedPost.userId,
          date: sub(new Date(), { minutes: Math.floor(Math.random() * 10080) }).toISOString(),
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
        };
      });
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // Destructure the payload
      const newPost = action.payload;

      // The fake API always returns 101 for the id of the newly created post, so we must build our own
      newPost.id = state.posts.reduce((postsMaxId, post) => Math.max(postsMaxId, post.id), -Infinity) + 1;

      // Store the user id as a number rather than a string
      newPost.userId = Number(newPost.userId);

      // Again, add the missing section to ensure that it matches our own post schema
      newPost.date = new Date().toISOString();
      newPost.reactions = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 };

      // We can directly add the new post object to our posts array
      state.posts.push(newPost);
    });
  },
});

// Action creators are generated for each case reducer function
export const { postAdded, reactionAdded } = postsSlice.actions;

// Selectors
export const selectAllPosts = (state) => state.posts.posts;

// Sort posts in reverse chronological order using datetime string
export const selectAllPostsOrdered = (state) => state.posts.posts.slice().sort((a, b) => b.date.localeCompare(a.date));

// Find the specific post by its id
export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
