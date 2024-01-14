// rrd imports
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";

// *** Pages ***
import Home from "./pages/Home";
import ViewAllPosts from "./pages/posts/ViewAllPosts";
import ViewPostDetails from "./pages/posts/ViewPostDetails";
import CreateNewPost from "./pages/posts/CreateNewPost";
import EditCurrentPost from "./pages/posts/EditCurrentPost";
import ViewAllUsers from "./pages/users/ViewAllUsers";
import ViewUserDetails from "./pages/users/ViewUserDetails";

// *** Layouts ***
import { default as RootLayout } from "./layouts/Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="posts">
        <Route index element={<ViewAllPosts />} />
        <Route path=":postId" element={<ViewPostDetails />} />
        <Route path="create" element={<CreateNewPost />} />
        <Route path="edit/:postId" element={<EditCurrentPost />} />
      </Route>

      <Route path="users">
        <Route index element={<ViewAllUsers />} />
        <Route path=":userId" element={<ViewUserDetails />} />
      </Route>

      {/* Catch all; replace with a 404 page if desired */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
