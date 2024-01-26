// component css styles
import styles from "./Paginate.module.css";

// other libraries
import cn from "classnames";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";

export default function Paginate({ currentPage, itemsPerPage, totalItems, onPageChanged }) {
  function handlePrevPageClicked() {
    if (currentPage !== 1) {
      onPageChanged(--currentPage);
    }
  }

  function handleNextPageClicked() {
    if (currentPage !== Math.ceil(totalItems / itemsPerPage)) {
      onPageChanged(++currentPage);
    }
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // Do not render anything if there are no items to display
    totalItems > 0 && (
      <section className={styles["paginate"]}>
        <header className={styles["paginate__prev"]} onClick={handlePrevPageClicked}>
          <BackwardIcon width={24} height={24} />
        </header>
        <ul className={styles["paginate__pages"]}>
          {pageNumbers.map((pageNumber) =>
            pageNumber === currentPage ? (
              <li key={pageNumber} className={cn(styles["paginate__page-number"], styles["paginate__page-number--current"])}>
                {pageNumber}
              </li>
            ) : (
              <li key={pageNumber} className={styles["paginate__page-number"]} onClick={() => onPageChanged(pageNumber)}>
                {pageNumber}
              </li>
            )
          )}
        </ul>
        <footer className={styles["paginate__next"]} onClick={handleNextPageClicked}>
          <ForwardIcon width={24} height={24} />
        </footer>
      </section>
    )
  );
}
