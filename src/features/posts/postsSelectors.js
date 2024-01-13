// Select all posts (either from the store or a slice)
export const selectAllPosts = (state) => (state.posts.posts ? state.posts.posts : state.posts);

// Sort posts in reverse chronological order using datetime string
export const selectAllPostsOrdered = (state) =>
  state.posts.posts ? state.posts.posts.slice().sort((a, b) => b.date.localeCompare(a.date)) : state.posts.slice().sort((a, b) => b.date.localeCompare(a.date));

// Select all posts except this one
export const selectAllPostsButThis = (state, postId) =>
  state.posts.posts ? state.posts.posts.filter((post) => post.id !== postId) : state.posts.filter((post) => post.id !== postId);

// Select all posts for a specific user
export const selectAllPostsForUser = (state, userId) =>
  state.posts.posts ? state.posts.posts.filter((post) => post.userId === userId) : state.posts.filter((post) => post.userId === userId);

// Find the specific post by its id
export const selectPostById = (state, postId) =>
  state.posts.posts ? state.posts.posts.find((post) => post.id === postId) : state.posts.find((post) => post.id === postId);

export const getPostsStatus = (state) => (state.posts ? state.posts.status : state.status);
export const getPostsError = (state) => (state.posts ? state.posts.error : state.error);
export const getNewPostId = (state) =>
  state.posts
    ? state.posts.reduce((postsMaxId, post) => Math.max(postsMaxId, post.id), -Infinity) + 1
    : state.reduce((postsMaxId, post) => Math.max(postsMaxId, post.id), -Infinity) + 1;
