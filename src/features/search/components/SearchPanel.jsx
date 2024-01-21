// component css styles
import styles from "./SearchPanel.module.css";

// react
import { useEffect } from "react";

// rrd imports
import { Form, useSearchParams, useSubmit } from "react-router-dom";

export default function SearchPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();
  const q = searchParams.get("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  // Handle keyword change
  function handleKeywordChange(ev) {
    const isFirstSearch = q == null;
    submit(ev.currentTarget.form, { replace: !isFirstSearch });
  }

  return (
    <section className={styles["search-panel"]}>
      <Form role="search">
        <input id="q" name="q" aria-label="Search" placeholder="Search" type="search" defaultValue={q} onChange={handleKeywordChange} />
      </Form>
    </section>
  );
}
