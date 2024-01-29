// component css styles
import styles from "./Header.module.css";

// redux stuff
import { useSelector, useDispatch } from "react-redux";

// posts logic & slice
import { getPostsCount } from "../features/posts/postsSelectors";
import { countIncreased } from "../features/posts/postsSlice";

export default function Header() {
  // Global state & dispatch coming from redux
  const count = useSelector(getPostsCount);
  const dispatch = useDispatch();

  return (
    <header className={styles["header"]}>
      <h1>Word Wave</h1>

      {/* Used for optimization purposes */}
      {/* <button type="button" onClick={() => dispatch(countIncreased())}>
        {count}
      </button> */}
    </header>
  );
}
