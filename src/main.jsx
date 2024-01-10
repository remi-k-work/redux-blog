import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// redux store and its provider for react
import { Provider } from "react-redux";
import { store } from "./app/store.js";

// posts logic & slice
import { fetchPosts } from "./features/posts/postsSlice.js";

// users logic & slice
import { fetchUsers } from "./features/users/usersSlice.js";

// We only need to obtain the list of users once, and we want to do it when the program starts
store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
