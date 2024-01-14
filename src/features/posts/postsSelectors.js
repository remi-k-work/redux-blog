// redux stuff
import { createSelector } from "@reduxjs/toolkit";

// posts logic & slice
import { postsAdapter } from "./postsSlice";

export const {
  // Select all posts
  selectAll: selectAllPosts,

  // Find the specific post by its id
  selectById: selectPostById,

  // Return the posts ids array
  selectIds: selectPostsIds,

  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts);

// Select all posts for a specific user
export const selectAllPostsForUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
  posts.filter((post) => post.userId === userId)
);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// Used for optimization purposes
export const getPostsCount = (state) => state.posts.count;
