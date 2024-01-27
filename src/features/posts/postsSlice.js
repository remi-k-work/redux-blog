// redux stuff
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// posts logic & slice
import { fetchPosts, addNewPost, updatePost, deletePost } from "./postsThunks";

// other libraries
import { sub } from "date-fns";
import { matchSorter } from "match-sorter";

export const postsAdapter = createEntityAdapter({
  // Sort posts in reverse chronological order using a datetime string
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// "Unglobalized" set of selector functions from the entity adapter
const postsLocalSelectors = postsAdapter.getSelectors();

const initialState = postsAdapter.getInitialState({
  // Found posts narrowed by search only
  foundPostsIds: [],

  // Currently viewed posts (narrowed by search and pagination)
  viewedPostsIds: [],

  // Pagination
  postsPerPage: 10,
  currentPage: 1,

  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,

  // Used for optimization purposes
  count: 0,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsPaginated(state, action) {
      // Destructure the payload
      const pageNumber = action.payload;

      // Set the current page number as provided
      state.currentPage = pageNumber;

      // Refresh the currently viewed posts to reflect the new page number
      const { postsPerPage, currentPage } = state;
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      state.viewedPostsIds = state.foundPostsIds.slice(indexOfFirstPost, indexOfLastPost);
    },

    // The user has typed a search phrase
    postsSearched(state, action) {
      // Destructure the payload
      const keyword = action.payload;

      // Search posts for specific terms in the "title" and "content" sections
      state.foundPostsIds = matchSorter(postsLocalSelectors.selectAll(state), keyword, {
        keys: ["title", "content"],
        // Sort results in reverse chronological order using a datetime string
        baseSort: (a, b) => {
          b.item.date.localeCompare(a.item.date);
        },
      }).map((post) => post.id);

      // Reset the current page number for pagination
      state.currentPage = 1;

      // Finally, let the results be the presently viewed posts
      const { postsPerPage, currentPage } = state;
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      state.viewedPostsIds = state.foundPostsIds.slice(indexOfFirstPost, indexOfLastPost);
    },

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
      // We know that useSelector will re-run every time an action is dispatched and
      // that it forces the component to re-render if we return a new reference value
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
      const validPosts = loadedPosts.map((loadedPost) => {
        // But only if they agree with our own schema first
        return {
          id: loadedPost.id,
          title: loadedPost.title,
          content: loadedPost.body,
          userId: loadedPost.userId,

          // Again, add the missing section to ensure that it matches our own post schema
          date: sub(new Date(), { minutes: Math.floor(Math.random() * 10080) }).toISOString(),

          // Create some random reactions for each post to make it appear more alive
          reactions: {
            thumbsUp: Math.floor(Math.random() * 10),
            hooray: Math.floor(Math.random() * 10),
            heart: Math.floor(Math.random() * 10),
            rocket: Math.floor(Math.random() * 10),
            eyes: Math.floor(Math.random() * 10),
          },
        };
      });
      postsAdapter.setAll(state, validPosts);

      // The found posts are identical to the fetched posts in the beginning
      state.foundPostsIds = state.ids;

      // Finally, let the results be the presently viewed posts
      const { postsPerPage, currentPage } = state;
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      state.viewedPostsIds = state.foundPostsIds.slice(indexOfFirstPost, indexOfLastPost);
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

      // The found posts are identical to the fetched posts in the beginning
      state.foundPostsIds = state.ids;

      // Finally, let the results be the presently viewed posts
      const { postsPerPage, currentPage } = state;
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      state.viewedPostsIds = state.foundPostsIds.slice(indexOfFirstPost, indexOfLastPost);
    });
  },
});

// Action creators are generated for each case reducer function
export const { postsPaginated, postsSearched, reactionAdded, countIncreased } = postsSlice.actions;

export default postsSlice.reducer;
