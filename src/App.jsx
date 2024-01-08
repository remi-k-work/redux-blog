// components
import AddPostForm from "./features/posts/components/AddPostForm";
import PostsList from "./features/posts/components/PostsList";

export default function App() {
  return (
    <div className="main-grid">
      <header>Header</header>
      <main>
        <AddPostForm />
        <PostsList />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
