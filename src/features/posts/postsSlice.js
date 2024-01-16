// redux stuff
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// other libraries
import { sub } from "date-fns";

// posts logic & slice
import { fetchPosts, addNewPost, updatePost, deletePost } from "./postsThunks";

export const postsAdapter = createEntityAdapter({
  // Sort posts in reverse chronological order using datetime string
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,

  // Used for optimization purposes
  count: 0,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // The user added a reaction emoji to the post
    reactionAdded(state, action) {
      // Destructure the payload
      const { postId, reaction } = action.payload;

      // Update a matching counter field for the clicked emoji
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },

    // Used for optimization purposes
    countIncreased(state) {
      state.count++;
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
      postsAdapter.setAll(
        state,
        loadedPosts.map((loadedPost) => {
          // But only if they agree with our own schema first
          return {
            id: loadedPost.id,
            title: loadedPost.title,
            content: loadedPost.body,
            userId: loadedPost.userId,

            // Again, add the missing section to ensure that it matches our own post schema
            date: sub(new Date(), { minutes: Math.floor(Math.random() * 10080) }).toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          };
        })
      );
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // Destructure the payload
      const { title, body, userId } = action.payload;

      // Modify the returned post to match our own schema
      const newPost = {
        // The fake API always returns 101 for the id of the newly created post, so we must build our own
        id: state.ids.reduce((postsMaxId, postId) => Math.max(postsMaxId, postId), -Infinity) + 1,

        title: title,
        content: body,
        userId: userId,

        // Again, add the missing section to ensure that it matches our own post schema
        date: new Date().toISOString(),
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      };

      // We can directly add the new post object to our posts array
      postsAdapter.addOne(state, newPost);
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      // Destructure the payload
      const { id, title, body, userId } = action.payload;

      // Find the just-updated post in our store
      const updatedPost = state.entities[id];

      // Then modify it accordingly, following our own schema
      updatedPost.title = title;
      updatedPost.content = body;
      updatedPost.userId = userId;
      updatedPost.date = new Date().toISOString();
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      // Destructure the payload
      const { id } = action.payload;

      // Simply remove the just-deleted post from our store
      postsAdapter.removeOne(state, id);
    });
  },
});

// Action creators are generated for each case reducer function
export const { reactionAdded, countIncreased } = postsSlice.actions;

export default postsSlice.reducer;
