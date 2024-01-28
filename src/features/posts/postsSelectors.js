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

  // Determine the total number of posts we have
  selectTotal: getNumberOfPosts,

  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts);

// "Unglobalized" set of selector functions from the entity adapter
export const postsLocalSelectors = postsAdapter.getSelectors();

// Select all posts for a specific user
export const selectAllPostsForUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
  posts.filter((post) => post.userId === Number(userId))
);

// Select all posts for a specific user ("Unglobalized")
export const locSelectAllPostsForUser = (state, userId) => postsLocalSelectors.selectAll(state).filter((post) => post.userId === Number(userId));

// Get currently viewed posts (narrowed by search and pagination)
export const getViewedPostsIds = (state) => state.posts.viewedPostsIds;

// Pagination
export const getPostsPerPage = (state) => state.posts.postsPerPage;
export const getCurrentPage = (state) => state.posts.currentPage;
export const getTotalItems = (state) => state.posts.foundPostsIds.length;

// Used to offer feedback on the status of fetching all posts
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// Other useful derived stats we can get about our posts
export const countPostsPerUserId = createSelector([selectAllPosts], (posts) => {
  // Output <= { userId: numberOfPosts, ... };
  const postsPerUserId = posts.reduce((accumulator, post) => {
    const userId = post.userId;
    if (!(userId in accumulator)) {
      accumulator[userId] = 0;
    }
    accumulator[userId]++;
    return accumulator;
  }, {});

  // Convert the object into an array of key-value pairs
  const sortedData = [];
  for (const [userId, postsCount] of Object.entries(postsPerUserId)) {
    sortedData.push({ userId, postsCount });
  }
  sortedData.sort((a, b) => b.postsCount - a.postsCount);

  // Output <= { userId, postsCount };
  return sortedData;
});

// Used for optimization purposes
export const getPostsCount = (state) => state.posts.count;
