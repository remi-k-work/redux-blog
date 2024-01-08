// redux stuff
import { createSlice, nanoid } from "@reduxjs/toolkit";

// other libraries
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // The user added a reaction emoji to the post
    reactionAdded(state, action) {
      // Destructure the payload
      const { postId, reaction } = action.payload;

      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },

    // A new post has been added by the user
    postAdded: {
      reducer(state, action) {
        // Destructure the payload
        const newPost = action.payload;

        state.push(newPost);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { postAdded } = postsSlice.actions;

// Selectors
export const selectAllPosts = (store) => store.posts;

// Sort posts in reverse chronological order using datetime string
export const selectAllPostsOrdered = (store) => store.posts.slice().sort((a, b) => b.date.localeCompare(a.date));

export default postsSlice.reducer;
