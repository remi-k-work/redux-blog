// component css styles
import styles from "./PostsList.module.css";

// redux stuff
import { useDispatch, useSelector } from "react-redux";

// posts logic & slice
import { getPostsStatus, getPostsError, getViewedPostsIds, getPostsPerPage, getTotalItems, getCurrentPage } from "../postsSelectors";
import { postsPaginated } from "../postsSlice";

// components
import PostExcerpt from "./PostExcerpt";
import SearchPanel from "../../search/components/SearchPanel";
import Paginate from "../../../components/Paginate";

export default function PostsList() {
  // Global state & dispatch coming from redux
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);
  const viewedPostsIds = useSelector(getViewedPostsIds);
  const currentPage = useSelector(getCurrentPage);
  const postsPerPage = useSelector(getPostsPerPage);
  const totalItems = useSelector(getTotalItems);
  const dispatch = useDispatch();

  function handlePageChanged(pageNumber) {
    dispatch(postsPaginated(pageNumber));
  }

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = viewedPostsIds.map((postId) => <PostExcerpt key={postId} postId={postId} />);
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section className={styles["posts-list"]}>
      <SearchPanel searchContext={"Search Posts"} />
      <Paginate currentPage={currentPage} itemsPerPage={postsPerPage} totalItems={totalItems} onPageChanged={handlePageChanged} />
      {content}
    </section>
  );
}
