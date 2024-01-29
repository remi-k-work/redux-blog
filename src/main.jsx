import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

/* the props */
import "open-props/style";

/* optional imports that use the props */
import "open-props/normalize";
import "open-props/buttons";
import "open-props/masks/edges";
import "open-props/masks/corner-cuts";

import "./index.css";

// redux store and its provider for react
import { Provider } from "react-redux";
import { store } from "./app/store.js";

// posts logic & slice
import { fetchPosts } from "./features/posts/postsThunks.js";

// users logic & slice
import { fetchUsers } from "./features/users/usersThunks.js";

// We only need to obtain the list of users once, and we want to do it when the program starts
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
