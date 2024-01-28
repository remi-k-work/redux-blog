// rrd imports
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";

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
    // <Route element={<RootLayout />}>
    //   <Route index element={<Home />} handle={{ crumb: () => <Link to="/">Home</Link> }} />

    //   <Route path="posts">
    //     <Route index element={<ViewAllPosts />} />
    //     <Route path=":postId" element={<ViewPostDetails />} />
    //     <Route path="create" element={<CreateNewPost />} action={createNewPostAction} />
    //     <Route path="edit/:postId" element={<EditCurrentPost />} action={editCurrentPostAction} />
    //   </Route>

    //   <Route path="users">
    //     <Route index element={<ViewAllUsers />} />
    //     <Route path=":userId" element={<ViewUserDetails />} />
    //   </Route>

    //   {/* Catch all; replace with a 404 page if desired */}
    //   <Route path="*" element={<Navigate to="/" replace />} />
    // </Route>

    <Route element={<RootLayout />}>
      <Route index element={<Home />} handle={"Home"} />
      <Route path="posts" element={<ViewAllPosts />} handle={"View All Posts"}>
        <Route path="/posts/:postId" element={<ViewPostDetails />} handle={"Post Details"} />
        <Route path="/posts/create" element={<CreateNewPost />} action={createNewPostAction} handle={"Create New Post"} />
        <Route path="/posts/edit/:postId" element={<EditCurrentPost />} action={editCurrentPostAction} handle={"Edit Current Post"} />
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
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
