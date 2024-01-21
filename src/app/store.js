// redux stuff
import { configureStore } from "@reduxjs/toolkit";

// all redux slices containing the specific data
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    search: searchReducer,
  },
});
