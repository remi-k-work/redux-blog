// rrd imports
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate, Link } from "react-router-dom";

// other libraries
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// *** Pages ***
import Home from "./pages/Home";
import ViewAllPosts from "./pages/posts/ViewAllPosts";
import ViewPostDetails from "./pages/posts/ViewPostDetails";
import CreateNewPost, { createNewPostAction } from "./pages/posts/CreateNewPost";
import EditCurrentPost, { editCurrentPostAction } from "./pages/posts/EditCurrentPost";
import ViewAllUsers from "./pages/users/ViewAllUsers";
import ViewUserDetails from "./pages/users/ViewUserDetails";

// *** Layouts ***
import { default as RootLayout } from "./layouts/Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" handle={{ crumb: (to) => <Link to={to}>Home</Link> }}>
        <Route index element={<Home />} />
        <Route path="posts" handle={{ crumb: (to) => <Link to={to}>View All Posts</Link> }}>
          <Route index element={<ViewAllPosts />} />
          <Route path=":postId" element={<ViewPostDetails />} handle={{ crumb: (to) => <Link to={to}>View Post Details</Link> }} />
          <Route path="create" element={<CreateNewPost />} action={createNewPostAction} handle={{ crumb: (to) => <Link to={to}>Create a New Post</Link> }} />
          <Route
            path="edit/:postId"
            element={<EditCurrentPost />}
            action={editCurrentPostAction}
            handle={{ crumb: (to) => <Link to={to}>Edit Current Post</Link> }}
          />
        </Route>

        <Route path="users" handle={{ crumb: (to) => <Link to={to}>View All Users</Link> }}>
          <Route index element={<ViewAllUsers />} />
          <Route path=":userId" element={<ViewUserDetails />} handle={{ crumb: (to) => <Link to={to}>View User Details</Link> }} />
        </Route>
      </Route>

      {/* Catch all; replace with a 404 page if desired */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
