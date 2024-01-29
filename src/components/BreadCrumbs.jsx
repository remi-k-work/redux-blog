// component css styles
import styles from "./BreadCrumbs.module.css";

// rrd imports
import { useMatches } from "react-router-dom";

// other libraries
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function BreadCrumbs() {
  // Get the current route matches on the page
  const matches = useMatches();

  const crumbs = matches
    // First, get rid of any matches that do not have a handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // Now map them into an array of elements, passing the pathname to each one
    .map((match) => match.handle.crumb(match.pathname));

  return (
    <h2 className={styles["bread-crumbs"]}>
      {crumbs.map((crumb, index) => (
        <span key={index} className={styles["bread-crumbs__crumb"]}>
          <ChevronRightIcon width={48} height={48} />
          {crumb}
        </span>
      ))}
    </h2>
  );
}
