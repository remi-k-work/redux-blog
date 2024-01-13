// redux stuff
import { createSlice, nanoid } from "@reduxjs/toolkit";

// other libraries
import { sub } from "date-fns";

// posts logic & slice
import { fetchPosts, addNewPost, updatePost, deletePost } from "./postsThunks";
import { getNewPostId, selectPostById, selectAllPostsButThis } from "./postsSelectors";

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
      const existingPost = selectPostById(state, postId);
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

          // Again, add the missing section to ensure that it matches our own post schema
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
      const { title, body, userId } = action.payload;

      // Modify the returned post to match our own schema
      const newPost = {
        // The fake API always returns 101 for the id of the newly created post, so we must build our own
        id: getNewPostId(state),

        title: title,
        content: body,
        userId: userId,

        // Again, add the missing section to ensure that it matches our own post schema
        date: new Date().toISOString(),
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      };

      // We can directly add the new post object to our posts array
      state.posts.push(newPost);
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      // Destructure the payload
      const { id, title, body, userId } = action.payload;

      // Find the just-updated post in our store
      const updatedPost = selectPostById(state, id);

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
      state.posts = selectAllPostsButThis(state, id);
    });
  },
});

// Action creators are generated for each case reducer function
export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
