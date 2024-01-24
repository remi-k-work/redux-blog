// component css styles
import styles from "./SearchPanel.module.css";

// react
import { useDeferredValue, useEffect, useRef, useState } from "react";

// rrd imports
import { Form, useSearchParams, useSubmit } from "react-router-dom";

// redux stuff
import { useDispatch } from "react-redux";

// search logic & slice
import { keywordEntered } from "../searchSlice";

// posts logic & slice
import { postsSearched } from "../../posts/postsSlice";

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
    // submit(formRef.current, { replace: true });
    dispatch(keywordEntered(deferredKeyword));
    dispatch(postsSearched(deferredKeyword));
  }, [deferredKeyword]);

  return (
    <section className={styles["search-panel"]}>
      <Form ref={formRef} role="search">
        <input
          name="q"
          aria-label="Search"
          placeholder={searchContext}
          type="search"
          size={25}
          maxLength={50}
          value={keyword}
          onChange={(ev) => setKeyword(ev.target.value)}
        />
      </Form>
    </section>
  );
}
