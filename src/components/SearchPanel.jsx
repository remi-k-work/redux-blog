// component css styles
import styles from "./SearchPanel.module.css";

// react
import { useDeferredValue, useEffect, useRef, useState } from "react";

// rrd imports
import { Form, useSearchParams, useSubmit } from "react-router-dom";

// redux stuff
import { useDispatch } from "react-redux";

// posts logic & slice
import { postsSearched } from "../features/posts/postsSlice";

// other libraries
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

export default function SearchPanel({ searchContext }) {
  // Global state & dispatch coming from redux
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword);
  const formRef = useRef(null);

  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  useEffect(() => {
    const queryKeyword = searchParams.get("q");
    if (queryKeyword) {
      setKeyword(queryKeyword);
    }
  }, []);

  useEffect(() => {
    dispatch(postsSearched(deferredKeyword));
    // submit(formRef.current, { replace: true });
  }, [deferredKeyword]);

  function handleKeywordChange(ev) {
    setKeyword(ev.target.value);
  }

  return (
    <section className={styles["search-panel"]}>
      <MagnifyingGlassCircleIcon width={24} height={24} />
      <Form ref={formRef} role="search">
        <input name="q" aria-label="Search" placeholder={searchContext} type="search" size={25} maxLength={50} value={keyword} onChange={handleKeywordChange} />
      </Form>
    </section>
  );
}
